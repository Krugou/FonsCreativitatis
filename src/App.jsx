import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import {MediaProvider} from './contexts/MediaContext';
import ContactUs from './views/ContactUs';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import MyFiles from './views/MyFiles';
import NotFound from './views/NotFound';
import PrivacyPolicy from './views/PrivacyPolicy';
import Profile from './views/Profile';
import Register from './views/Register';
import ReviewUpload from './views/ReviewUpload';
import ReviewView from './views/ReviewView';
import Search from './views/Search';
import TermsOfService from './views/TermsOfService';
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
            <Route path="/register" element={<Register />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Route>
        </Routes>
      </MediaProvider>
    </Router>
  );
};

// add to App.jsx after imports

export default App;
