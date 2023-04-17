import React from 'react';
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

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);
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

  return (
    <ImageListItem>
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
        subtitle={file.description}
        actionIcon={
          <ButtonGroup>
            <Button
              component={Link}
              variant="contained"
              to="/single"
              state={{file}}
            >
              View
            </Button>
            {file.user_id === user.user_id && (
              <>
                <Button
                  component={Link}
                  variant="contained"
                  to="/update"
                  state={{file}}
                >
                  Update
                </Button>
                <Button component={Link} variant="contained" onClick={doDelete}>
                  Delete
                </Button>
              </>
            )}
          </ButtonGroup>
        }
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
