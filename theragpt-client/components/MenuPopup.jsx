import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";
import { auth } from "./Fire";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { Drawer } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function MenuPopupState({ setUserEmail, setAuthState, user }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          <Typography
            color="textSecondary"
            variant="body1"
            fontFamily={"Montserrat"}
            sx={{ fontSize: isMobile ? ".75rem" : "1rem" }}
          >
            Logged in as {user.email}
          </Typography>
        </MenuItem>

        <MenuItem
          sx={{
            fontFamily: "League Spartan",
            fontSize: isMobile ? "1.3rem" : "1.3rem",
          }}
          onClick={backButton}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "League Spartan",
            fontSize: isMobile ? "1.3rem" : "1.3rem",
          }}
          onClick={Faq}
        >
          Learn More (FAQ)
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "League Spartan",
            fontSize: isMobile ? "1.3rem" : "1.3rem",
          }}
          onClick={accountSettings}
        >
          Account Settings
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "League Spartan",
            fontSize: isMobile ? "1.4rem" : "1.5rem",
            color: "#5484AB",
          }}
          onClick={handleUpgrade}
        >
          <b>Upgrade</b>
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "League Spartan",
            fontSize: isMobile ? "1.3rem" : "1.3rem",
          }}
          onClick={handleSignOut}
        >
          Logout
        </MenuItem>
      </Drawer>
    </React.Fragment>
  );
}
