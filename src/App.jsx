import './App.css';
import Home from './views/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './views/Layout';
import Single from './views/Single';
import Profile from './views/Profile';
import Login from './views/Login';
import {MediaProvider} from './contexts/MediaContext';
import Logout from './views/Logout';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Update from './views/Update';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myfiles" element={<MyFiles />} />
            <Route path="/update" element={<Update />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

// add to App.jsx after imports

export default App;
