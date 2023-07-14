import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Typography,
  TextField,
} from "@mui/material";
import MenuPopupState from "./MenuPopup";
import Link from "@mui/material/Link";

function AccountSettings({ setUser, setAuthState, user }) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  function terms(e) {
    e.preventDefault;
    setAuthState("terms");
  }

  return (
    <div maxWidth="100%">
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>

      <div style={{ maxWidth: "50%", margin: "0 auto" }}>
        <Typography marginTop={5} marginBottom={1} variant="h4">
          Account Settings
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="account settings tabs"
        >
          <Tab label="Subscription" />
          <Tab label="General" />
          <Tab label="Usage" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Box marginBottom={2}>
            <Typography variant="h6">Your Plan</Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="body1">Free Plan</Typography>
          </Box>
          <Box marginBottom={2}>
            <Button
              variant="outlined"
              onClick={() => console.log("Renew or Cancel")}
            >
              Renew / Cancel
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Box marginBottom={1}>
            <Typography variant="h6">Email</Typography>
          </Box>
          <Box marginBottom={5}>
            <TextField variant="outlined" value={user} disabled />
          </Box>
          <Box marginBottom={4}>
            <Typography variant="body1">
              <Link onClick={terms}>Terms of Service</Link>
            </Typography>
          </Box>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Box marginBottom={2}>
            <Typography variant="h6">Usage</Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="body1">
              50% of your monthly limit used
            </Typography>
          </Box>
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default AccountSettings;
