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
import Terms from "./Terms";

export default function Selector({ setUser, setAuthState, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  function Terms(e) {
    e.preventDefault;
    setAuthState("terms");
  }
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
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <img
        style={{
          display: isMobile ? "none" : "",
          position: "absolute",
          width: isMobile ? "10rem" : "16rem",
          marginLeft: isMobile ? "1rem" : "3rem",
        }}
        src={MainLogo}
      />
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E8E1DC",
                borderRadius: "3em",
                padding: isMobile ? "1em" : "0em",
                width: "100%",
                maxWidth: isMobile ? "90vw" : "30vw",
                margin: isMobile ? "1em 0" : "0",
                transition: isMobile ? "" : "transform 0.15s ease-in-out",
                ":hover": isMobile ? "" : { transform: "scale(1.05)" },
                fontFamily: "'Roboto Slab', serif",
                lineHeight: "1.6rem",
              }}
            >
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
                {" "}
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
              <Button onClick={() => setAuthState("dbt")}>
                <Typography variant="h4">Jung DBT</Typography>
              </Button>
              {/* Description for Jung DBT */}
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
