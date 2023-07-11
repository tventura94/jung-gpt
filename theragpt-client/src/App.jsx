import * as React from "react";
import { Box } from "@mui/system"; // import Box
import Nav from "../components/Nav";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Fire";
import Footer from "../components/Footer";

function App() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          setAuthState("dashboard");
        } else {
          setUser(null);
          setAuthState("signin");
        }
      }
    );
    return unSubscribeAuth;
  }, [user]);

  if (authState === null) return <h2>Loading...</h2>;

  if (authState === "register")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Register setAuthState={setAuthState} setUser={setUser} />
        <Footer />
      </Box>
    );

  if (authState === "signin")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <SignIn setAuthState={setAuthState} setUser={setUser} />
        <Footer />
      </Box>
    );

  if (user)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Dashboard setAuthState={setAuthState} setUser={setUser} user={user} />
        <Footer />
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Register />
      <Footer />
    </Box>
  );
}

export default App;
