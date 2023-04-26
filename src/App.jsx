import React, {useState} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.scss';
import {MediaProvider} from './contexts/MediaContext';
import UserIdContext from './contexts/UserIdContext';
import Careers from './views/Careers';
import ContactUs from './views/ContactUs';
import Home from './views/Home';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import MyFiles from './views/MyFiles';
import NotFound from './views/NotFound';
import OurTeam from './views/OurTeam';
import PrivacyPolicy from './views/PrivacyPolicy';
import Profile from './views/Profile';
import Register from './views/Register';
import ReviewUpload from './views/ReviewUpload';
import ReviewView from './views/ReviewView';
import ReviewerProfile from './views/ReviewerProfile';
import Search from './views/Search';
import TermsOfService from './views/TermsOfService';
import Update from './views/Update';
import WhoWeAre from './views/WhoWeAre';
// q: is it possible to use less space for the imports?
// a: yes, but it's not recommended
// q: why?
// a: because it's harder to read and maintain

const App = () => {
  const [id, setId] = useState(null);
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MediaProvider>
        <UserIdContext.Provider value={{id, setId}}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reviewView" element={<ReviewView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reviewupload" element={<ReviewUpload />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/myfiles" element={<MyFiles />} />
              <Route path="/update" element={<Update />} />
              <Route path="/search" element={<Search />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/ourteam" element={<OurTeam />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/aboutus" element={<WhoWeAre />} />
              <Route path="/reviewerprofile/" element={<ReviewerProfile />} />
            </Route>
          </Routes>
        </UserIdContext.Provider>
      </MediaProvider>
    </Router>
  );
};

// add to App.jsx after imports

export default App;
