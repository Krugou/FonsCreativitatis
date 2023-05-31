import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {appId, baseUrl, generalUser} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const getFavourites = async (id) => {
  return await doFetch(baseUrl + 'favourites/file/' + id);
};

const getLikes = async (fileid) => {
  try {
    const likeInfo = await getFavourites(fileid);
    return likeInfo;
  } catch (error) {
    // console.log(error.message);
  }
};

const getUser = async (userid, token) => {
  const options = {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  };
  return await doFetch(baseUrl + 'users/' + userid, options);
};

const postLogin = async (inputs) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  return await doFetch(baseUrl + 'login', options);
};

const useMedia = (myFilesOnly = false, userid) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {user, update} = useContext(MediaContext);

  const fetchDefaultUserToken = async () => {
    const defaultUser = await postLogin(generalUser);
    return defaultUser.token;
  };

  const getMedia = async () => {
    try {
      let files = await useTags().getTag(appId);

      if (myFilesOnly) {
        files = files.filter((file) => {
          return file.user_id === user.user_id;
        });
      }

      if (userid) {
        files = files.filter((file) => {
          return file.user_id === userid;
        });
      }

      const token = await fetchDefaultUserToken();

      files = await Promise.all(
        files.map(async (file) => {
          const likeInfo = await getLikes(file.file_id);
          file.likes = likeInfo.length;

          const ownerInfo = await getUser(file.user_id, token);
          file.owner = ownerInfo;

          const thumbnail = await doFetch(baseUrl + 'media/' + file.file_id);
          file.thumbnails = thumbnail.thumbnails;

          return file;
        })
      );

      setMediaArray(files);
    } catch (error) {
      // console.log('getMedia', error.message);
    }
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      // console.log(error.message);
    }
  }, [update]); // Aina kun update muuttuu, ajaa useEffectin

  useEffect(() => {
    if (myFilesOnly) {
      try {
        getMedia(myFilesOnly);
      } catch (error) {
        // console.log(error.message);
      }
    }
  }, [user]); // Aina kun user muuttuu, ajaa useEffectin

  const postMedia = async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };
    return await doFetch(baseUrl + 'media', options);
  };

  const deleteMedia = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'media/' + id, options);
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'media/' + id, options);
  };

  const getAllFiles = async (id, token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'media/user/' + id, options);
  };

  return {
    mediaArray,
    setMediaArray,
    postMedia,
    deleteMedia,
    putMedia,
    getAllFiles,
  };
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'users', options);
  };
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'users/user', options);
  };
  const getCheckUser = async (username) => {
    const {available} = await doFetch(baseUrl + 'users/username/' + username);
    return available;
  };

  const getUser = async (userid, token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'users/' + userid, options);
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };
  return {
    postUser,
    getUserByToken,
    getCheckUser,
    getUser,
    putUser,
  };
};
const useComments = () => {
  const [error, setError] = useState('');

  const getComments = async (fileId) => {
    try {
      const response = await fetch(
        `https://media.mw.metropolia.fi/wbma/comments/file/${fileId}`
      );

      if (!response.ok) {
        throw new Error('Failed to get comments');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postComment = async (fileId, comment, userToken) => {
    try {
      const response = await fetch(baseUrl + 'comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
        body: JSON.stringify({
          file_id: fileId,
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getAllComments = async (userToken) => {
    try {
      const response = await doFetch(baseUrl + 'comments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      });
      return response.data;
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const deleteComment = async (commentId, userToken) => {
    try {
      const response = await fetch(
        `https://media.mw.metropolia.fi/wbma/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.message === 'Comment not found') {
          throw new Error(`Failed to delete comment: Comment not found`);
        } else {
          throw new Error(`Failed to delete comment: ${errorResponse.message}`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {getComments, postComment, deleteComment, getAllComments, error};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};
const useTags = () => {
  const getTag = async (tag) => {
    const tagResult = await doFetch(baseUrl + 'tags/' + tag);
    if (!tagResult.length > 0) {
      throw new Error('Tag not found');
    }
    return tagResult;
  };
  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'tags', fetchOptions);
  };

  const getTagsByFileId = async (id) => {
    const tags = await doFetch(baseUrl + 'tags/file/' + id);
    if (!tags.length > 0) {
      return [{tag_id: 0, file_id: id, tag: 'no tags'}];
    } else {
      return tags;
    }
  };
  return {getTag, postTag, getTagsByFileId};
};

const useFavourite = () => {
  const postFavourite = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'favourites', fetchOptions);
  };

  const getFavourites = async (id) => {
    return await doFetch(baseUrl + 'favourites/file/' + id);
  };

  const deleteFavourite = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'favourites/file/' + id, options);
  };

  const getLikes = async (fileid) => {
    try {
      const likeInfo = await getFavourites(fileid);
      return likeInfo;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const getFavouritesOfUser = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'favourites', options);
  };

  return {
    postFavourite,
    getFavourites,
    deleteFavourite,
    getLikes,
    getFavouritesOfUser,
  };
};

export {
  doFetch,
  useAuthentication,
  useComments,
  useFavourite,
  useMedia,
  useTags,
  useUser,
};
