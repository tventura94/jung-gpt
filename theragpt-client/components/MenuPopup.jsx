import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "./Fire";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { Drawer } from "@mui/material";

export default function MenuPopupState({ setUserEmail, setAuthState, user }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  function handleSignOut() {
    signOut(auth).then(() => {
      setUserEmail(null);
      setAuthState("login");
    });
  }

  function handleUpgrade() {
    setAuthState("upgrade");
  }

  function accountSettings() {
    setAuthState("accountsettings");
  }

  function backButton() {
    setAuthState("selector");
  }
  function Faq() {
    setAuthState("faq");
  }

  return (
    <React.Fragment>
      <Button
        style={{
          backgroundColor: "#5B6B7F",
          borderLeft: "1px solid silver",
          height: "3rem",
          width: "3rem",
          boxShadow: "none",
          borderRadius: "0rem",
          color: "whitesmoke",
          margin: 0,
          padding: 0,
        }}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
      >
        <ManageAccountsIcon />
      </Button>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MenuItem onClick={() => setIsDrawerOpen(false)}>
          <Typography color="textSecondary" variant="body1">
            Logged in as {user.email}
          </Typography>
        </MenuItem>

        <MenuItem onClick={backButton}>Dashboard</MenuItem>
        <MenuItem onClick={Faq}>Learn More (FAQ)</MenuItem>
        <MenuItem onClick={accountSettings}>Account Settings</MenuItem>
        <MenuItem onClick={handleUpgrade}>Upgrade</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Drawer>
    </React.Fragment>
  );
}
