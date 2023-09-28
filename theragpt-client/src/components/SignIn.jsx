'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { auth, getUserData } from 'components/Fire';
import GoogleAd from 'components/googleAd';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {''}
      <Link color="inherit" href="#"></Link> {''}
    </Typography>
  );
}

export default function SignIn({ setUserEmail }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { email } = result.user;
      getUserData(email); // Pass the UID and email to getUserData
      setUserEmail(email);
      router.push('/selector');
    } catch (error) {
      // Handle any errors that occur during the sign-in process
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { email } = userCredential.user;
          getUserData(email); // Pass the UID and email to getUserData
          setUserEmail(email);
          router.push('/selector');
        })
        .catch((err) => {
          if (!email || !password)
            err = 'Please enter a valid Username and Password';
          return alert(err);
        });
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      return alert(`Please enter your email, than click 'Forgot Password'`);
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((err) => {
        err = 'No Account Found';
        alert(err);
      });
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
      <Container
        className
        component="main"
        maxWidth="md"
        sx={{
          marginTop: isMobile ? 5 : 15,
        }}
      >
        <CssBaseline />
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 6,
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'center',
              textAlign: 'center',
              backgroundColor: isMobile ? 'none' : '#e8e1dc',
              padding: '15px',
              borderRadius: '3%',
              marginLeft: '14px',
              border: isMobile ? '' : '2px solid silver',
              boxShadow: isMobile ? '' : '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow effect
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: isMobile ? 'none' : '#e8e1dc',
                  color: '#1E4B66',
                  paddingTop: '2rem',
                }}
              >
                <Avatar
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: isMobile ? '#FFFFFF' : '#e8e1dc',
                    color: '#1E4B66',
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 40, paddingBottom: 0 }} />
                </Avatar>
              </Box>
              <Typography
                marginTop=".5rem"
                fontSize="22px"
                component="h1"
                variant="h5"
                sx={{ fontFamily: 'League Spartan' }}
              >
                Sign In
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password (at least 6 characters)"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={handleLogin}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: '80%',
                    padding: '15px',
                    fontFamily: 'League Spartan',
                  }}
                  style={{
                    backgroundColor: '#1E4B66',
                  }}
                >
                  Sign In
                </Button>
                <p
                  style={{
                    display: 'flex',
                    width: '100%',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    fontFamily: 'League Spartan',
                  }}
                >
                  or
                </p>
                <Button type="submit" onClick={handleGoogle}>
                  <Image
                    src="/images/google.png"
                    width={382}
                    height={92}
                    alt="Google Logo"
                    style={{
                      width: isMobile ? '55%' : '65%',
                      height: 'auto',
                    }}
                  />
                </Button>
                <Typography
                  sx={{
                    fontSize: isMobile ? '16' : '14px',
                    display: isMobile ? 'flex' : 'flex',
                    justifyContent: 'right',
                    marginRight: isMobile ? '1rem' : '',
                    fontFamily: 'League Spartan',
                    marginTop: '.4rem',
                  }}
                >
                  <b>Don't have an account?</b>
                </Typography>
                <Grid
                  style={{
                    display: 'flex',
                    paddingRight: isMobile ? '0rem' : '1.5rem',
                    width: isMobile ? '87%' : '100%',
                  }}
                  marginTop={'1rem'}
                  paddingBottom={'0rem'}
                >
                  <Grid item xs>
                    <Button
                      halfwidth="true"
                      variant="contained"
                      style={{
                        backgroundColor: '#506072',
                        marginTop: '0px',
                        fontFamily: 'League Spartan',
                      }}
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      halfwidth="true"
                      variant="contained"
                      style={{
                        backgroundColor: '#689980',
                        marginTop: '0px',
                        fontFamily: 'League Spartan',
                      }}
                      onClick={() => router.push('/register')}
                    >
                      {'Sign up'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={11} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '95%',
                width: '100%',
                ml: '2rem',
                mt: isMobile ? '2.5rem' : '2rem',
              }}
            >
              <Typography
                variant="h6"
                align="left"
                sx={{
                  fontSize: '20px',
                  lineHeight: '2rem;',
                  fontFamily: 'League Spartan',
                }}
              >
                <b>
                  Welcome to JungGPT, a groundbreaking, first of its kind,
                  Emotional Reflection Feedback (ERF) Tool.
                </b>{' '}
                <br />
                <br />
                Meet JungGPT: Your compact AI companion for emotional insights!
                This revolutionary tool is fueled by a vast repository of
                information spanning psychology, therapy, and philosophy.
                Crafted to reflect your emotions, JungGPT dives into your
                feelings, initiating profound discussions and consistently
                presenting thought-provoking queries for your contemplation.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  margin: '0 auto',
                  marginTop: '1rem',
                  justifyContent: 'space-between',
                  alignItems: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '1rem' : '0rem',
                  }}
                >
                  <IconButton
                    onClick={() =>
                      window.open('https://www.tiktok.com/@junggpt', '_blank')
                    }
                  >
                    <i className="fa-brands fa-tiktok"></i>
                  </IconButton>
                  <IconButton
                    sx={{
                      marginLeft: '1rem',
                      marginRight: '1.5rem',
                    }}
                    onClick={() =>
                      window.open('https://www.instagram.com/junggpt', '_blank')
                    }
                  >
                    <i className="fa fa-instagram"></i>
                  </IconButton>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <a
                    href="https://theresanaiforthat.com/ai/junggpt/?ref=embed"
                    target="_blank"
                  >
                    <Image
                      src="https://media.theresanaiforthat.com/featured3.png"
                      width={300}
                      height={61}
                      alt=""
                      style={{ height: 'auto' }}
                    />
                  </a>
                </Box>
              </Box>
            </Box>
            <GoogleAd />
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 0, mb: 3 }} />
      </Container>
      <Container> </Container>
    </ThemeProvider>
  );
}
