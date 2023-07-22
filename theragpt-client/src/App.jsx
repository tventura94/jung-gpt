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
import Upgrade from "../components/Upgrade";
import Faq from "../components/Faq";
import { CircularProgress } from "@mui/material";
function App() {
  const [user, setUser] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);
  const [subscriptionStatus, setSubscriptionStatus] =
    React.useState("inactive"); // add this line

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
          setUserEmail(authenticatedUser);
          setAuthState("selector");
        } else {
          setUser(null);
          setUserEmail(null);
          setAuthState("signin");
        }
      }
    );
    return unSubscribeAuth;
  }, [user, userEmail, subscriptionStatus]);

  if (authState === null)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          style={{
            color: "#5E7E91",
          }}
          size={100}
        />
      </div>
    );

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
        <Dashboard
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
          subscriptionStatus={subscriptionStatus}
          setSubscriptionStatus={setSubscriptionStatus}
        />
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
        <Register setAuthState={setAuthState} setUserEmail={setUserEmail} />
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
        <SignIn setAuthState={setAuthState} setUserEmail={setUserEmail} />
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
        <Selector
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
          subscriptionStatus={subscriptionStatus}
        />

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
        <Dbt
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
          subscriptionStatus={subscriptionStatus}
        />
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
          setUserEmail={setUserEmail}
          user={user}
          subscriptionStatus={subscriptionStatus}
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
        <Terms
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
        />
        <Footer />
      </Box>
    );

  if (authState === "upgrade")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Upgrade
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
          setSubscriptionStatus={setSubscriptionStatus}
        />
        <Footer />
      </Box>
    );
  if (authState === "faq")
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Faq
          setAuthState={setAuthState}
          setUserEmail={setUserEmail}
          user={user}
          setSubscriptionStatus={setSubscriptionStatus}
        />
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
      <Register setUserEmail={setUserEmail} />
      <Footer />
    </Box>
  );
}

export default App;
