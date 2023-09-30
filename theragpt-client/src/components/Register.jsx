import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'libs/firebase';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, useTheme } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {''}
      <Link
        href="#"
        style={{
          color: 'rgb(25, 118, 210)',
          textDecoration: 'underline rgba(25, 118, 210, 0.4)',
        }}
      />{' '}
      {'.'}
    </Typography>
  );
}

export default function Register() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (email !== null && password !== null) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push('/dashboard');
          alert('Account Successfully created!');
        })
        .catch((err) => {
          err = 'Please enter valid Email and Password';
          return alert(err);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Image
        src={'/images/will.png'}
        width={isMobile ? 160 : 256}
        height={isMobile ? 160 : 256}
        priority={true}
        alt=""
        style={{
          position: 'absolute',
          marginLeft: isMobile ? '1rem' : '3rem',
        }}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 27.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1E4B66' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 0, fontFamily: 'League Spartan' }}
          >
            Create New Account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              name="email"
              value={email}
              placeholder="Email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password (at least 6 characters)"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleRegister}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: '#1E4B66',
                marginTop: '30px',
                marginBottom: '60px',
                fontFamily: 'League Spartan',
              }}
            >
              Sign Up
            </Button>
            <div
              style={{
                fontFamily: 'League Spartan',
                fontSize: isMobile ? '22px' : '18px',
              }}
              className="alreadyHaveAnAccount"
            >
              <p>Already have an account?</p>
              <Button
                halfwidth="true"
                variant="contained"
                style={{
                  backgroundColor: '#1E4B66',
                  marginTop: '0px',
                  fontFamily: 'League Spartan',
                }}
                onClick={() => router.push('/signin')}
              >
                Sign In
              </Button>
            </div>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
