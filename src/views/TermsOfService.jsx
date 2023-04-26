import {Container, Divider, Typography} from '@mui/material';
import React, {useEffect} from 'react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{mt: 2, mb: 2}}>
        Terms of Service
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="h6" sx={{mb: 1}}>
        Introduction
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        Welcome to our restaurant review website! By using our website, you
        agree to these terms of service. If you do not agree to these terms,
        please do not use our website.
      </Typography>
      <Typography variant="h6" sx={{mb: 1}}>
        User Conduct
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        You are solely responsible for your use of our website and any content
        you submit to our website. You agree to use our website only for lawful
        purposes and in a way that does not infringe the rights of others. You
        may not use our website to harass, intimidate, or threaten other users,
        or to promote illegal activities. We reserve the right to remove any
        content that we deem inappropriate, and to terminate your access to our
        website if you violate these terms of service.
      </Typography>
      <Typography variant="h6" sx={{mb: 1}}>
        Intellectual Property
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        All content on our website, including text, graphics, logos, and images,
        is the property of our website or our licensors and is protected by
        copyright and other intellectual property laws. You may not use our
        content for any commercial purpose without our express written consent.
      </Typography>
      <Typography variant="h6" sx={{mb: 1}}>
        Disclaimer of Warranties
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        Our website is provided on an "as is" and "as available" basis. We make
        no representations or warranties of any kind, express or implied, as to
        the operation of our website or the information, content, materials, or
        products included on our website. You use our website at your own risk.
      </Typography>
      <Typography variant="h6" sx={{mb: 1}}>
        Limitation of Liability
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        In no event shall our website or its affiliates be liable for any
        direct, indirect, incidental, special, or consequential damages arising
        out of or in connection with your use of our website, whether based on
        contract, tort, strict liability, or any other legal theory, even if we
        have been advised of the possibility of such damages.
      </Typography>
      <Typography variant="h6" sx={{mb: 1}}>
        Changes to Terms of Service
      </Typography>
      <Typography variant="body1" sx={{mb: 2}}>
        We reserve the right to change these terms of service at any time. Your
        continued use of our website after any such changes will constitute your
        acceptance of the revised terms of service.
      </Typography>
    </Container>
  );
};

export default TermsOfService;
