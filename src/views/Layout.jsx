import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import {useContext, useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/apiHooks';
import {themeOptions} from '../theme/themeOptions';
const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const navigate = useNavigate();
  const {getUserByToken} = useUser();
  const location = useLocation();

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const user = await getUserByToken(userToken);
      if (user) {
        setUser(user);
        const target = location.pathname === '/' ? '/home' : location.pathname;
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
            <Typography
              variant="h6"
              sx={{
                m: 2,
                letterSpacing: '.3rem',
              }}
            >
              Application :D
            </Typography>
            <Box sx={{mr: 2}}>
              <Button sx={{color: 'white'}} component={Link} to="/home">
                Home
              </Button>
              {user ? (
                <>
                  <Button sx={{color: 'white'}} component={Link} to="/profile">
                    Profile
                  </Button>
                  <Button sx={{color: 'white'}} component={Link} to="/upload">
                    Upload
                  </Button>
                  <Button sx={{color: 'white'}} component={Link} to="/myfiles">
                    My Files
                  </Button>
                  <Button sx={{color: 'white'}} component={Link} to="/logout">
                    Logout
                  </Button>
                </>
              ) : (
                <Button sx={{color: 'white'}} component={Link} to="/">
                  Login
                </Button>
              )}
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
