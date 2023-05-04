import {Box, Container, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const PrivacyPolicy = () => {
  const viewText = 'Privacy Policy';
  useScrollToTop();
  usePageTitle(viewText);
  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="md">
        <Box sx={{my: {xs: '2em', md: '3em'}, px: {xs: '1em', md: '2em'}}}>
          <Typography variant="h4" sx={{mb: '1em'}}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            This Privacy Policy describes how JAKReviews (“we,” “us,” or “our”)
            collects, uses, and shares your personal information when you use
            our restaurant review website.
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Information We Collect
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We collect the following types of personal information when you use
            our website:
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your IP address</li>
              <li>
                Any other information you voluntarily provide us through our
                website, such as restaurant reviews or comments
              </li>
            </ul>
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We use your personal information to:
            <ul>
              <li>Provide and improve our restaurant review website</li>
              <li>Respond to your inquiries and comments</li>
              <li>
                Send you marketing communications, if you have opted-in to
                receive them
              </li>
            </ul>
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            How We Share Your Information
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We may share your personal information with:
            <ul>
              <li>
                Third-party service providers who help us operate our website
                and provide services to you
              </li>
              <li>
                Law enforcement or other government officials, in response to a
                subpoena, court order, or similar legal requirement
              </li>
            </ul>
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Your Rights and Choices
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            You have the following rights and choices regarding your personal
            information:
            <ul>
              <li>
                You can access and update your personal information by logging
                into your account on our website
              </li>
              <li>
                You can unsubscribe from our marketing communications at any
                time by clicking the “unsubscribe” link in the email
              </li>
              <li>
                You can delete your account and all associated personal
                information by contacting us at [contact email]
              </li>
            </ul>
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Data Retention
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. We will
            securely delete your personal information once it is no longer
            needed for the purposes stated in this Privacy Policy.
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Security of Your Information
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We take reasonable steps to protect your personal information from
            unauthorized access, disclosure, or alteration. We use a variety of
            security technologies and procedures to help protect your personal
            information from unauthorized access, use, or disclosure. However,
            no data transmission over the Internet or wireless network can be
            guaranteed to be 100% secure. Therefore, while we strive to protect
            your personal information, you acknowledge that: (a) there are
            security and privacy limitations inherent to the Internet which are
            beyond our control; and (b) security, integrity, and privacy of any
            and all information and data exchanged between you and us through
            this website cannot be guaranteed.
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Changes to Our Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            We may update this Privacy Policy from time to time. If we make
            material changes to this Privacy Policy, we will notify you by
            posting a notice on our website prior to the effective date of the
            changes. By continuing to use our website after the effective date
            of any changes, you agree to be bound by the revised Privacy Policy.
          </Typography>
          <Typography variant="h5" sx={{mb: '1em'}}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{mb: '1em'}}>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at [contact email].
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
