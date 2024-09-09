import React from 'react';
import { Box, Typography, TextField, Button, Grid, Container, Card, CardContent, useTheme } from '@mui/material';
import HeroImage from '../assets/hero-image.jpg'; // Import your hero image

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Main Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Side: Login and Legends */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: theme.spacing(2),
                boxShadow: `0 0 ${theme.spacing(2)} rgba(0, 0, 0, 0.1)`,
                padding: theme.spacing(4),
              }}
            >
              {/* <Typography variant="h4" align="center" gutterBottom>
                We help you with the creation of your reports
              </Typography> */}
              <Typography variant="h4" gutterBottom>
                Log In
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  style: {
                    borderRadius: theme.spacing(1),
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  style: {
                    borderRadius: theme.spacing(1),
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: theme.spacing(1),
                  padding: theme.spacing(1.5),
                }}
              >
                Log In
              </Button>
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Some few legends:
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Box mr={2}>🔍</Box>
                <Typography>You can auto correct your text</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box mr={2}>🎤</Box>
                <Typography>Speech to text</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Box mr={2}>📝</Box>
                <Typography>Sample Answer</Typography>
              </Box>
            </Card>
          </Grid>

          {/* Right Side: Hero Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={HeroImage}
              alt="Hero Image"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: theme.spacing(2),
                boxShadow: `0 0 ${theme.spacing(2)} rgba(0, 0, 0, 0.1)`,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;