import * as React from "react";
import { Box } from "@mui/system"; // import Box
import Nav from "../components/Nav";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Fire";
import Footer from "../components/Footer";
import Selector from "../components/Selector";
import Dbt from "../components/Dbt";
import AccountSettings from "../components/AccountSettings";
import Terms from "../components/Terms";

function App() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          setAuthState("selector");
        } else {
          setUser(null);
          setAuthState("signin");
        }
      }
    );
    return unSubscribeAuth;
  }, [user]);

  if (authState === null) return <h2>Loading...</h2>;

  if (authState === "dashboard")
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

  if (authState === "selector")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Selector setAuthState={setAuthState} setUser={setUser} user={user} />
        <Footer />
      </Box>
    );

  if (authState === "dbt")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Dbt setAuthState={setAuthState} setUser={setUser} user={user} />
        <Footer />
      </Box>
    );

  if (authState === "accountsettings")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <AccountSettings
          setAuthState={setAuthState}
          setUser={setUser}
          user={user}
        />
        <Footer />
      </Box>
    );
  if (authState === "terms")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Terms setAuthState={setAuthState} setUser={setUser} user={user} />
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
