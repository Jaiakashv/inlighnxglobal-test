import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth={false} sx={{ mt: '30px', py: 4, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing and using this website ("Inlighn Tech"), you accept and agree to be bound by the following terms and conditions.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          General Terms
        </Typography>
        <ul>
          <li>The content of this Website is for general information and educational purposes only and is subject to change without notice.</li>
          <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this Website for any particular purpose.</li>
          <li>Your use of any information or materials on this Website is entirely at your own risk, for which we shall not be liable.</li>
          <li>This Website contains material that is owned by or licensed to us, including but not limited to the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          User Responsibilities
        </Typography>
        <ul>
          <li>You must be at least 18 years old or have the consent of a parent or legal guardian to use this platform.</li>
          <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device to prevent unauthorized access to your account.</li>
          <li>You must provide accurate and complete information when creating an account or making a purchase on this platform.</li>
          <li>You agree not to use this platform for any illegal or unauthorized purpose and must comply with all applicable laws and regulations.</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content available on this platform, including but not limited to Course materials, videos, text, graphics, logos, and images, are the intellectual property of the platform or its content providers and are protected by copyright, trademark, and other intellectual property laws.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          In no event shall the EdTech platform, its affiliates, instructors, or partners be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use or inability to use the platform or its content.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Internship Specific Terms
        </Typography>
        <ul>
          <li>You will receive an official offer letter before the internship start date.</li>
          <li>Swag items are provided only if specific requirements are met.</li>
          <li>The internship program is unpaid for both students and experienced individuals.</li>
          <li>Any legal matters, disputes, or agreements are governed by Indian law.</li>
        </ul>

        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
          Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or need assistance regarding our terms and conditions, please contact us:
          <br />Email: info@inlighntech.com
          <br />Phone: +91 9368842663
        </Typography>

      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
