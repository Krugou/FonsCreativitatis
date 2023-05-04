import {Container, Divider, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import HeroImage from '../components/HeroImage';
import usePageTitle from '../hooks/UsePageTitle';
import useScrollToTop from '../hooks/UseScrollToTop';

const TermsOfService = () => {
  const viewText = 'Terms of Service';
  useScrollToTop();
  usePageTitle(viewText);
  return (
    <>
      <HeroImage heroText={viewText} />
      <Container maxWidth="md">
        <Divider sx={{mb: '2rem'}} />
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          Introduction
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          Welcome to JAKReviews, a restaurant review website created by three
          passionate food lovers - Joonas Lamminmäki, Aleksi Nokelainen, and
          Kaarle Häyhä. By using our website, you agree to these terms of
          service. If you do not agree to these terms, please do not use our
          website.
        </Typography>
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          User Conduct
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          You are solely responsible for your use of our website and any content
          you submit to our website. You agree to use our website only for
          lawful purposes and in a way that does not infringe the rights of
          others. You may not use our website to harass, intimidate, or threaten
          other users, or to promote illegal activities. We reserve the right to
          remove any content that we deem inappropriate, and to terminate your
          access to our website if you violate these terms of service.
        </Typography>
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          Intellectual Property
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          All content on our website, including text, graphics, logos, and
          images, is the property of JAKReviews or our licensors and is
          protected by copyright and other intellectual property laws. You may
          not use our content for any commercial purpose without our express
          written consent.
        </Typography>
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          Disclaimer of Warranties
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          Our website is provided on an "as is" and "as available" basis. We
          make no representations or warranties of any kind, express or implied,
          as to the operation of our website or the information, content,
          materials, or products included on our website.You use our website at
          your own risk.
        </Typography>
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          Limitation of Liability
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          In no event shall JAKReviews or its affiliates be liable for any
          direct, indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of our website, whether
          based on contract, tort, strict liability, or any other legal theory,
          even if we have been advised of the possibility of such damages.
        </Typography>
        <Typography
          variant="h6"
          sx={{mb: '1rem', fontSize: {xs: '1.5rem', md: '2rem'}}}
        >
          Changes to Terms of Service
        </Typography>
        <Typography
          variant="body1"
          sx={{mb: '2rem', fontSize: {xs: '1rem', md: '1.5rem'}}}
        >
          We reserve the right to change these terms of service at any time.
          Your continued use of our website after any such changes will
          constitute your acceptance of the revised terms of service.
        </Typography>
      </Container>
    </>
  );
};

export default TermsOfService;
