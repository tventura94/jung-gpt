import * as React from "react";
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
      <div>
        <Register setAuthState={setAuthState} setUser={setUser} />
        <Footer />
      </div>
    );

  if (authState === "signin")
    return (
      <div>
        <SignIn setAuthState={setAuthState} setUser={setUser} />
        <Footer />
      </div>
    );

  if (user)
    return (
      <div>
        <Dashboard setAuthState={setAuthState} setUser={setUser} user={user} />
      </div>
    );

  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
