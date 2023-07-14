import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuPopupState from "./MenuPopup";

export default function Selector({ setUser, setAuthState, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "#E8E1DC",
    borderRadius: "1em",
    padding: "1em",
    width: "100%",
    maxWidth: isMobile ? "90vw" : "40vw",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          padding: "1em",
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
          }}
        >
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <Box sx={boxStyles}>
              <Button onClick={() => setAuthState("dashboard")}>
                <Typography variant="h4">Jung GPT</Typography>
              </Button>
              Our very first Emotional Reflection Feedback tool, JungGPT, is an
              advanced language model that facilitates emotional understanding.
              It processes user input, deciphers the inherent emotional context,
              and reflects it back to the user for enhanced clarity. Leveraging
              this understanding, JungGPT provides personalized, strategic
              suggestions for emotional navigation and progression.
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
              Our custom DBT centered tool. This tool is Dialectical Behavioral
              Therapy. It helps users reframe thoughts, learn DBT skills, and
              even gives them worksheets to work on based on their own personal
              issues.
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
}
