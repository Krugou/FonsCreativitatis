import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  createTheme,
} from '@mui/material';

import {
  AccountCircle,
  CloudUpload,
  Folder,
  Home,
  Menu as MenuIcon,
  Search,
} from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import FetchWeather from '../components/FetchWeather';
import OurFooter from '../components/OurFooter';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';
import {themeOptions} from '../theme/themeOptions';
const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const navigate = useNavigate();
  const {getUserByToken} = useUser();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const user = await getUserByToken(userToken);
      if (user) {
        setUser(user);
        const target = location.pathname === '/' ? '/' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran

  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar position="sticky">
          <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <IconButton
              sx={{
                ml: 2,
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              component={Link}
              to="/"
              variant="h3"
              sx={{
                m: 1,
                letterSpacing: '.3rem',
                color: 'white',
                fontSize: {xs: '1rem', md: '1.5rem'},
              }}
            >
              JAK-Reviews
            </Button>
            <Drawer
              open={open}
              onClose={() => {
                setOpen(!open);
              }}
            >
              <List
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <ListItemButton component={Link} to={'/'}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                {!user && (
                  <>
                    <ListItemButton component={Link} to="/login">
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/register">
                      <ListItemIcon>
                        <AppRegistrationIcon />
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItemButton>
                  </>
                )}
                {user ? (
                  <>
                    <ListItemButton component={Link} to="/profile">
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/reviewupload">
                      <ListItemIcon>
                        <CloudUpload />
                      </ListItemIcon>
                      <ListItemText primary="Write A Review" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/myreviews">
                      <ListItemIcon>
                        <Folder />
                      </ListItemIcon>
                      <ListItemText primary="My Reviews" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/logout">
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </>
                ) : (
                  <ListItemButton component={Link} to="/login">
                    <ListItemIcon>
                      <CloudUpload />
                    </ListItemIcon>
                    <ListItemText primary="Write A Review" />
                  </ListItemButton>
                )}
              </List>
            </Drawer>
            <FetchWeather />
            <Box sx={{mr: 2}}>
              <Button
                sx={{
                  color: 'white',
                  display: {xs: 'none', md: 'inline-flex'},
                }}
                component={Link}
                to="/"
              >
                Home
              </Button>

              {user ? (
                <IconButton color="inherit" component={Link} to="/profile">
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button
                  sx={{
                    color: 'white',
                    display: {xs: 'none', md: 'inline-flex'},
                  }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
              <IconButton color="inherit" component={Link} to="/search">
                <Search />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Outlet />
        </main>
      </Container>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: {xs: 'block', md: 'none'},
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            zIndex: 'max',
            borderColor: 'white',
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{color: 'white', borderColor: 'white'}}
          />
          <BottomNavigationAction
            label="Write a Review"
            icon={<RateReviewIcon />}
            component={Link}
            to={user ? '/reviewupload' : '/login'}
            sx={{color: 'white', borderColor: 'white'}}
          />

          <BottomNavigationAction
            label="Nearby Restaurants"
            icon={<RestaurantIcon />}
            component={Link}
            to="/nearbyrestaurants"
            sx={{color: 'white', borderColor: 'white'}}
          />
        </BottomNavigation>
      </Box>
      <OurFooter />
    </ThemeProvider>
  );
};

export default Layout;
