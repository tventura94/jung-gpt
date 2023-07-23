import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, getUserData } from "./Fire";
import MainLogo from "/will.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isMotionValue } from "framer-motion";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {""}
      <Link color="inherit" href="#"></Link> {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({ setUserEmail, setAuthState }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { email } = userCredential.user;
          getUserData(email); // Pass the UID and email to getUserData
          setUserEmail(email);
          setAuthState("selector");
        })
        .catch((err) => {
          if (!email || !password)
            err = "Please enter a valid Username and Password";
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
        alert("Password reset email sent!");
      })
      .catch((err) => {
        err = "No Account Found";
        alert(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <img
        style={{
          position: "absolute",
          width: isMobile ? "10rem" : "16rem",
          marginLeft: isMobile ? "1rem" : "3rem",
        }}
        src={MainLogo}
      ></img>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              backgroundColor: isMobile ? "none" : "#e8e1dc",
              padding: "15px",
              borderRadius: "3%",
              marginLeft: "14px",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: isMobile ? "none" : "#e8e1dc",
                  color: "#1E4B66",
                  paddingTop: "2rem",
                }}
              >
                <Avatar
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: isMobile ? "#FFFFFF" : "#e8e1dc",
                    color: "#1E4B66",
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
                  sx={{ mt: 3, mb: 2, width: "80%", padding: "15px" }}
                  style={{
                    backgroundColor: "#1E4B66",
                  }}
                >
                  Sign In
                </Button>
                <Grid
                  container
                  style={{
                    paddingRight: isMobile ? "1.5rem" : "0rem",
                  }}
                  marginTop={"1rem"}
                  paddingBottom={"0rem"}
                >
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      style={{
                        padding: ".2rem",
                        borderRadius: "5px",
                        color: "#1E4B90",
                      }}
                      href="#"
                      variant="body2"
                      onClick={() => setAuthState("register")}
                    >
                      <b> {"Don't have an account? Sign Up"}</b>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={11} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "95%",
                width: "100%",
                ml: "2rem",
                mt: isMobile ? "2.5rem" : "0rem",
              }}
            >
              <Typography
                variant="h6"
                align="left"
                sx={{
                  fontSize: "18px",
                  lineHeight: "2rem;",
                }}
              >
                <b>
                  Welcome to JungGPT, a groundbreaking, first of its kind,
                  Emotional Reflection Feedback (ERF) Tool.
                </b>{" "}
                <br />
                <br />
                Conceived by a team of psychologists and AI researchers, we
                provide an innovative approach to self-reflection and emotional
                understanding. With the aim of fostering self-awareness, we
                blend fields of psychology, medicine, psychiatry, and philosophy
                to encourage introspection and insight. Remember, we are not a
                replacement for professional therapy. Let's start your journey
                towards greater emotional clarity today.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
