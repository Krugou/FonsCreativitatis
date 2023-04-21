import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/variables';
import {Link} from 'react-router-dom';
import {
  Button,
  ImageListItem,
  ImageListItemBar,
  ButtonGroup,
} from '@mui/material';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
  const [owner, setOwner] = useState({username: ''});
  const {getUser} = useUser();
  const doDelete = async () => {
    try {
      const sure = confirm('Are you sure?');
      if (sure) {
        const token = localStorage.getItem('userToken');
        const deleteResult = await deleteMedia(file.file_id, token);
        console.log(deleteResult);
        setUpdate(!update);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchOwner = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const ownerInfo = await getUser(file.user_id, userToken);
      setOwner(ownerInfo);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchOwner();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran, kun sivu ladata
  return (
    <ImageListItem component={Link} to="/single" state={{file}}>
      <img
        src={
          file.media_type !== 'audio'
            ? mediaUrl + file.thumbnails?.w640
            : 'vite.svg'
        }
        alt={file.title}
      />
      <ImageListItemBar
        title={file.title}
        subtitle={'By:' + owner.username}
        /*
          actionIcon={
            <ButtonGroup>
              {file.user_id === user?.user_id && (
                <>
                  <Button
                    component={Link}
                    variant="contained"
                    to="/update"
                    state={{file}}
                  >
                    Update
                  </Button>
                  <Button
                    component={Link}
                    variant="contained"
                    onClick={doDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
            </ButtonGroup>
          }
          */
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
