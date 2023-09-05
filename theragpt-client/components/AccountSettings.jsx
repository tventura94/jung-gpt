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
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import { db } from "../components/Fire"; // assuming you've configured firebase in a file named firebase.js
function AccountSettings({ setUserEmail, setAuthState, user }) {
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free Plan");
  const [totalTokens, setTotalTokens] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"),
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];
        if (newSub) {
          if (newSub.status === "active") {
            setSubscriptionStatus("Premium");
          } else {
            setSubscriptionStatus(newSub.status);
          }
        } else {
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
    e.preventDefault();
    setAuthState("terms");
  }

  useEffect(() => {
    // Define the first and last day of the current month
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // First Query: Filter by timestamp
    const unsubscribe = onSnapshot(
      query(
        collection(db, "users", user.uid, "messages"),
        where("timestamp", ">=", firstDayOfMonth),
        where("timestamp", "<=", lastDayOfMonth)
      ),
      async (snapshot) => {
        // Initialize total tokens
        let calculatedTotalTokens = 0;

        // Second Step: Further filter by usage on client side
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.usage && data.usage.total_tokens) {
            calculatedTotalTokens += data.usage.total_tokens;
          }
        });

        // Update state
        setTotalTokens(calculatedTotalTokens);
      }
    );

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

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
          sx={{
            width: "130%",
          }}
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
              href="https://billing.stripe.com/p/login/fZe6qkftf9fg8dqdQQ"
            >
              Manage Subscription
            </Button>
            <Typography
              sx={{
                marginTop: "1rem",
                fontSize: " 17px",
                fontFamily: "'Roboto Slab', serif",
                lineHeight: "30px",
              }}
            >
              <b>
                {" "}
                DO NOT USE THIS BUTTON TO PURCHASE SUBSCRIPTION.
                <br />{" "}
              </b>
              Instead, select 'Upgrade' from the navigation menu.
            </Typography>
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
            <Typography
              sx={{
                margin: "1rem",
                fontSize: isMobile ? "16px" : "20px",
                fontFamily: "League Spartan",
              }}
              variant="body1"
            >
              {subscriptionStatus === "Premium"
                ? "Unlimited Messaging, Access to JungSMART & First Access to new and improved models"
                : `Free Plan - Limited Messaging`}
            </Typography>
            {subscriptionStatus === "Premium" && (
              <Box marginBottom={2}>
                <Typography
                  sx={{
                    margin: "1rem",
                    fontSize: isMobile ? "20px" : "30px",
                    fontFamily: "League Spartan",
                  }}
                  variant="body1"
                >
                  Total monthly tokens used: {totalTokens}
                </Typography>
                <Typography
                  sx={{
                    margin: "1rem",
                    fontSize: isMobile ? "20px" : "30px",
                    fontFamily: "League Spartan",
                  }}
                  variant="body1"
                >
                  Total monthly cost in dollars: $
                  {(totalTokens * 0.00006).toFixed(2)}
                </Typography>
              </Box>
            )}
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
