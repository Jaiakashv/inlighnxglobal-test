import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Disclaimers = () => {
  return (
    <Container maxWidth={false} sx={{ mt: '30px', py: 4, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
          Disclaimers
        </Typography>
        
        <Typography variant="body1" paragraph>
          The information provided by Inlighn Tech on our website, platforms, internship programs, 
          webinars, or any related services is for general informational purposes only. All information 
          on the site and offered through our platforms is provided in good faith; however, we make no 
          representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, 
          validity, reliability, availability, or completeness of any information.
        </Typography>

        <Typography variant="body1" paragraph>
          Under no circumstance shall we have any liability to you for any loss or damage of any kind 
          incurred as a result of the use of the service or reliance on any information. Your use of the 
          service and your reliance on any information is solely at your own risk.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Internship & Learning Programs
        </Typography>
        <Typography variant="body1" paragraph>
          Our internship and training programs are designed to provide practical knowledge and skill-building 
          opportunities. However, participation in these programs does not guarantee job placement, employment, 
          or academic credit unless explicitly mentioned. Any claims about job opportunities, employment, or 
          recognition are subject to the terms and conditions of the respective program.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Third-party Links and Services
        </Typography>
        <Typography variant="body1" paragraph>
          Our services may contain links to third-party websites or services. We are not responsible for the 
          content, privacy policies, or practices of any third-party services. We strongly advise you to review 
          the privacy policy and terms of service of every site you visit.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          No Professional Advice
        </Typography>
        <Typography variant="body1" paragraph>
          The information provided through our services is not intended to be a substitute for professional 
          advice. Always seek the advice of qualified professionals regarding any questions you may have 
          regarding educational, career, or other professional matters.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Changes to This Disclaimer
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify this disclaimer at any time. Any changes will be effective immediately 
          upon posting on this page. Your continued use of our services after any such changes constitutes 
          your acceptance of the new terms.
        </Typography>

      </Paper>
    </Container>
  );
};

export default Disclaimers;
