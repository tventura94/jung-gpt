import React, { useState, useEffect } from "react";
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
import MainLogo from "/will.png";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../components/Fire"; // assuming you've configured firebase in a file named firebase.js

function AccountSettings({ setUserEmail, setAuthState, user }) {
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free Plan");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"),
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];

        if (newSub) {
          console.log(`Account is ${newSub.status}`);
          if (newSub.status === "active") {
            setSubscriptionStatus("Premium");
          } else {
            setSubscriptionStatus(newSub.status);
          }
        } else {
          console.log("Account not active");
          setSubscriptionStatus("Free Plan");
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);
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
          setUserEmail={setUserEmail}
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
            <Box marginBottom={2}>
              <Typography variant="body1">{subscriptionStatus}</Typography>
            </Box>
          </Box>
          <Box marginBottom={2}>
            <Button
              variant="outlined"
              href="https://billing.stripe.com/p/login/test_eVaeWAbl9gXXgKYfYY"
            >
              Manage Subscription
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Box marginBottom={1}>
            <Typography variant="h6">Email</Typography>
          </Box>
          <Box marginBottom={5}>
            <TextField variant="outlined" value={user.email} disabled />
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
              {subscriptionStatus === "Premium"
                ? "Unlimited Messaging & Access to JungDBT"
                : `Free Plan - Limited Messaging`}
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
