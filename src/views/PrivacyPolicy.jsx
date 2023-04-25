import {Box, Typography} from '@mui/material';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <Box sx={{my: 2}}>
      <Typography variant="h4" sx={{mb: 2}}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        This Privacy Policy describes how [Restaurant Review Website] (“we,”
        “us,” or “our”) collects, uses, and shares your personal information
        when you use our website.
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        Information We Collect
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        We collect the following types of personal information when you use our
        website:
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
      <Typography variant="h5" sx={{mb: 2}}>
        How We Use Your Information
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        We use your personal information to:
        <ul>
          <li>Provide and improve our website</li>
          <li>Respond to your inquiries and comments</li>
          <li>
            Send you marketing communications, if you have opted-in to receive
            them
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        How We Share Your Information
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        We may share your personal information with:
        <ul>
          <li>
            Third-party service providers who help us operate our website and
            provide services to you
          </li>
          <li>
            Law enforcement or other government officials, in response to a
            subpoena, court order, or similar legal requirement
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        Your Rights and Choices
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        You have the following rights and choices regarding your personal
        information:
        <ul>
          <li>
            You can access and update your personal information by logging into
            your account on our website
          </li>
          <li>
            You can unsubscribe from our marketing communications at any time by
            clicking the “unsubscribe” link in the email
          </li>
          <li>
            You can delete your account and all associated personal information
            by contacting us at [contact email]
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        Data Retention
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this Privacy Policy, unless a longer retention
        period is required or permitted by law.
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at [contact email].
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
