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
  Typography,
  createTheme,
} from '@mui/material';

// material-ui icons
import {
  AccountCircle,
  CloudUpload,
  Folder,
  Home,
  Menu as MenuIcon,
  Search,
} from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/apiHooks';
import { themeOptions } from '../theme/themeOptions';
const Layout = () => {
  const { user, setUser } = useContext(MediaContext);
  const navigate = useNavigate();
  const { getUserByToken } = useUser();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                m: 2,
                letterSpacing: '.3rem',
              }}
            >
              <Button sx={{ color: 'white' }} component={Link} to="/">
                JAK-Reviews
              </Button>
            </Typography>
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
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </>
                )}
                {user && (
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
                      <ListItemText primary="Reviewupload" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/myfiles">
                      <ListItemIcon>
                        <Folder />
                      </ListItemIcon>
                      <ListItemText primary="My Files" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/logout">
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </>
                )}
              </List>
            </Drawer>
            <Box sx={{ mr: 2 }}>
              <Button sx={{ color: 'white' }} component={Link} to="/">
                Home
              </Button>

              {user ? (
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button sx={{ color: 'white' }} component={Link} to="/login">
                  Login
                </Button>
              )}
              <IconButton color="inherit">
                <Search />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Outlet />
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
