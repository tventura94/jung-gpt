import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "./Fire";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { Drawer } from "@mui/material";

export default function MenuPopupState({ setUser, setAuthState, user }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setUser(null);
        setAuthState("login");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function backButton(e) {
    e.preventDefault;
    setAuthState("selector");
  }
  return (
    <React.Fragment>
      <Button
        style={{
          backgroundColor: "#262626",
          borderLeft: "1px solid #747474",
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
            Logged in as {user}
          </Typography>
        </MenuItem>

        <MenuItem onClick={backButton}>Change Selection</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Drawer>
    </React.Fragment>
  );
}
