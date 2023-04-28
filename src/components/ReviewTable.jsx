import {
  Box,
  FormControl,
  FormControlLabel,
  ImageList,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, {useEffect, useState} from 'react';
import {useAuthentication, useFavourite, useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {generalUser} from '../utils/variables';
import ReviewCard from './ReviewCard';

const ReviewTable = ({myFilesOnly = false}) => {
  const {mediaArray, setMediaArray, deleteMedia} = useMedia(myFilesOnly);
  const windowSize = useWindowSize();
  const {postLogin} = useAuthentication();
  const [token, setToken] = useState(null);
  const [sortOption, setSortOption] = useState('Latest');
  const [mediaFiles, setMediaFiles] = useState([]);
  const {getLikes} = useFavourite();
  useEffect(() => {
    const fetchDefaultUserToken = async () => {
      const defaultUser = await postLogin(generalUser);

      setToken(defaultUser.token);
    };
    fetchDefaultUserToken();
  }, [postLogin]);
  const handleChange = (event) => {
    const value = event ? event.target.value : 'Latest';
    if (value === 'Oldest') {
      const sortedMedia = [...mediaArray].sort((a, b) => a.file_id - b.file_id);
      setMediaFiles(sortedMedia);
    } else if (value === 'Latest') {
      const sortedMedia = [...mediaArray].sort((a, b) => b.file_id - a.file_id);
      setMediaFiles(sortedMedia);
    } else if (value === 'Highest Star') {
      const sortedMedia = [...mediaArray].sort((a, b) => {
        try {
          return (
            JSON.parse(b.description).stars - JSON.parse(a.description).stars
          );
        } catch (error) {
          console.log(error);
        }
      });
      setMediaFiles(sortedMedia);
    }
    if (value === 'Most Favorited') {
      mediaArray.forEach(async (file) => {
        const sortedMedia = [...mediaArray].sort((a, b) => b.likes - a.likes);
        setMediaFiles(sortedMedia);
      });
    }
    setSortOption(value);
  };

  useEffect(() => {
    mediaArray.forEach(async (file) => {
      const likeInfo = await getLikes(file.file_id);
      file['likes'] = likeInfo.length;
    });
    handleChange();
  }, [mediaArray]);
  const columns = () => {
    if (windowSize.width > 1200) return 4;
    if (windowSize.width > 768) return 3;
    if (windowSize.width > 480) return 2;
    return 1;
  };
  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: {xs: 'column', sm: 'row'},
          gap: {xs: '1rem', sm: '0'},
        }}
      >
        <Typography variant="h3" component="h2">
          {sortOption} Reviews:
        </Typography>
        <FormControl>
          <Typography variant="sort-by" sx={{ml: 1}}>
            Sort By:
          </Typography>
          <Select
            className="favorite-selector"
            value={sortOption}
            onChange={handleChange}
          >
            <MenuItem value="Latest">
              <div className="item-selector">
                <AutorenewIcon className="highest-star-selector-icon" />
                <span className="selector-text">Latest</span>
              </div>
            </MenuItem>
            <MenuItem value="Oldest">
              <div className="item-selector">
                <AutorenewIcon className="highest-star-selector-icon" />
                <span className="selector-text">Oldest</span>
              </div>
            </MenuItem>
            <MenuItem value="Highest Star">
              <div className="highest-star-selector">
                <StarIcon
                  className="highest-star-selector-icon"
                  sx={{color: 'orange'}}
                />
                <span className="highest-star-selector-text">Highest Star</span>
              </div>
            </MenuItem>
            <MenuItem value="Most Favorited">
              <div className="favorite-selector">
                <FavoriteIcon
                  className="favorite-selector-icon"
                  sx={{color: 'red'}}
                />
                <span className="favorite-selector-text">Most Favorited</span>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ImageList cols={columns()} gap={24} component={Box} mt={3}>
        {mediaFiles.map((item, index) => {
          return (
            <ReviewCard
              key={index}
              file={item}
              deleteMedia={deleteMedia}
              myFilesOnly={myFilesOnly}
              defaultUserToken={token}
            />
          );
        })}
      </ImageList>
    </>
  );
};

ReviewTable.propTypes = {
  myFilesOnly: PropTypes.bool,
};

export default ReviewTable;
