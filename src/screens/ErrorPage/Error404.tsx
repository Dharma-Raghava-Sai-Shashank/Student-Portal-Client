import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { createStyles, makeStyles, Theme } from '@mui/material/styles';
import imgToSrc from './2456051.jpg';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(2),
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginTop: '16px',
});


const Error404: React.FC = () => {
  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary">
        Return Home
      </Button>
      <Box marginTop={2}>
        <StyledImage src={imgToSrc} alt="Error 404" />
      </Box>
    </StyledContainer>
  );
};

export default Error404;
