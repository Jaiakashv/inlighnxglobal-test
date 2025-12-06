import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth={false} sx={{ mt: '50px', py: 4, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          At InlighnXglobal, we respect your privacy and are committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
          when you interact with us through our website, application, webinars, or any of our services.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following information:
        </Typography>
        <ul>
          <li>Personal Identification Information (Name, Email Address, Phone Number, etc.)</li>
          <li>Educational and professional details provided by you</li>
          <li>Communication content (e.g., messages, emails, feedback)</li>
          <li>Usage data (e.g., IP address, browser type, access time)</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the collected data to:
        </Typography>
        <ul>
          <li>Manage and provide our internship and training services</li>
          <li>Communicate with you (including support, updates, or announcements)</li>
          <li>Improve our services and platform</li>
          <li>Ensure compliance with legal obligations</li>
          <li>Promote our events and opportunities with your consent</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell or trade your personal information. We may share data with:
        </Typography>
        <ul>
          <li>Trusted service providers who assist in operating our services</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate technical and organizational security measures to protect your data. 
          However, no electronic transmission or storage is 100% secure, and we cannot guarantee 
          absolute data security.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
        </Typography>
        <ul>
          <li>Access, update, or delete your personal data</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Object to certain uses of your data</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          6. Cookies and Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          We may use cookies to enhance user experience. You can modify your browser settings to 
          disable cookies, but it may affect certain functionalities.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          7. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to update this Privacy Policy at any time. We encourage you to 
          review it periodically for any changes.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
