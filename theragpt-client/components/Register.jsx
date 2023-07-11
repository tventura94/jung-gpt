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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Fire";
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

export default function Register({ setUser, setAuthState }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (email !== null && password !== null) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setUser(email);
          setAuthState("dashboard");
          alert("Account Successfully created!");
        })
        .catch((err) => {
          err = "Please enter valid Email and Password";
          return alert(err);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 27.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1E4B66" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 0 }}>
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
                backgroundColor: "#1E4B66",
                marginTop: "30px",
                marginBottom: "60px",
              }}
            >
              Sign Up
            </Button>
            <div className="alreadyHaveAnAccount">
              <p>Already have an account?</p>
              <Button
                halfWidth
                variant="contained"
                style={{
                  backgroundColor: "#1E4B66",
                  marginTop: "0px",
                }}
                onClick={() => setAuthState("signin")}
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
