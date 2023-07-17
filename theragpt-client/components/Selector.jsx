import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuPopupState from "./MenuPopup";
import MainLogo from "/will.png";
import { useEffect } from "react";
import DbtLogo from "/jung-dbt.png";
import JungFace from "/gpt-text-1.png";

import { getUserData, db } from "./Fire";

export default function Selector({ setUserEmail, setAuthState, user }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData(user.email);
      } catch (error) {
        // Handle any potential errors
        console.log("Error retrieving user data:", error);
      }
    };

    fetchData();
  }, [user.email]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleTermsClick = (e) => {
    e.preventDefault();
    setAuthState("terms");
  };

  React.useEffect(() => {
    const hasOpened = sessionStorage.getItem("hasOpened");

    if (!hasOpened) {
      setOpen(true);
      sessionStorage.setItem("hasOpened", "true");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E1DC",
    borderRadius: "2em",
    padding: isMobile ? "1em" : "2em",
    width: "100%",
    maxWidth: isMobile ? "90vw" : "30vw",
    margin: isMobile ? "1em 0" : "0",
    transition: isMobile ? "" : "transform 0.15s ease-in-out",
    ":hover": isMobile ? "" : { transform: "scale(1.05)" },
    fontFamily: "'Roboto Slab', serif",
    lineHeight: "1.6rem",
  };

  return (
    <div style={{ boxSizing: "border-box" }}>
      <div className="main">
        <img
          style={{
            color: "white",
            right: "5%",
            bottom: "94.2%",
            width: isMobile ? "3rem" : "3rem",
            marginLeft: isMobile ? "0rem" : "0rem",
            marginRight: isMobile ? "1rem" : "1rem",
          }}
          src={JungFace}
        />
        <MenuPopupState
          setUserEmail={setUserEmail}
          setAuthState={setAuthState}
          user={user}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1em",
          height: isMobile ? "" : "90vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            maxWidth: "97%",
            marginBottom: isMobile ? "3rem" : "0",
            margin: isMobile ? "3rem" : "0",
          }}
        >
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <Box sx={boxStyles}>
              <Button
                style={{
                  width: "18rem",
                  height: "8rem",
                }}
                onClick={() => setAuthState("dashboard")}
              >
                <img
                  style={{
                    width: "18rem",
                  }}
                  src={MainLogo}
                />
              </Button>
              <p
                style={{
                  width: "80%",
                  marginBottom: "3rem",
                  lineHeight: "2rem",
                }}
              >
                <b>Our very first Emotional Reflection Feedback tool.</b> <br />
                An advanced language model that facilitates emotional
                understanding. It processes user input, deciphers the inherent
                emotional context, and reflects it back to the user for enhanced
                clarity. Leveraging this understanding, JungGPT provides
                personalized, strategic suggestions for emotional navigation and
                progression.
              </p>
            </Box>
          </motion.div>
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Box sx={boxStyles}>
              <Button
                style={{
                  width: "18rem",
                  height: "8rem",
                }}
                onClick={() => setAuthState("dbt")}
              >
                <img
                  style={{
                    width: "18rem",
                  }}
                  src={DbtLogo}
                />
              </Button>
              <p
                style={{
                  width: "80%",
                  marginBottom: "3rem",
                  lineHeight: "2rem",
                }}
              >
                <b>Our groundbreaking DBT Tool, JungDBT</b> <br />
                An advanced language model that supports Dialectical Behavior
                Therapy (DBT) principles. It analyzes user input, discerns
                emotional nuances, and offers reflections to promote better
                clarity and understanding. Drawing on this insight, JungDBT
                provides personalized guidance and strategies for effective
                emotional navigation and growth.
              </p>
            </Box>
          </motion.div>
        </Box>
      </div>

      {/* Terms of Service Dialog */}
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">Terms of Service</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            By continuing, you agree to our Terms of Service
          </Typography>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleCheckboxChange} />
            }
            label="I agree"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={!checked}
            disableBackdropClick
            disableEscapeKeyDown
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
