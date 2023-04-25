import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import {MediaProvider} from './contexts/MediaContext';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import MyFiles from './views/MyFiles';
import NotFound from './views/NotFound';
import Profile from './views/Profile';
import ReviewUpload from './views/ReviewUpload';
import ReviewView from './views/ReviewView';
import Search from './views/Search';
import Update from './views/Update';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ReviewView" element={<ReviewView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviewupload" element={<ReviewUpload />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myfiles" element={<MyFiles />} />
            <Route path="/update" element={<Update />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

// add to App.jsx after imports

export default App;
