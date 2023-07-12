import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Dashboard from "./Dashboard";
import MenuPopup from "./MenuPopup";
import MenuPopupState from "./MenuPopup";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Selector({ setUser, setAuthState, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <div
        style={{
          marginBottom: isMobile ? "6rem" : "0", // adjust spacing based on screen size
        }}
        className="main"
      >
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "97%",

            marginBottom: isMobile ? "3rem" : "0", // adjust spacing based on screen size
          }}
        >
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "90vw" : "40vw", // adjust for smaller screens
                backgroundColor: "#E8E1DC",
                borderRadius: "1em",
                margin: isMobile ? "1em 0" : "0em", // adjust for smaller screens
                padding: "1em",
                transition: isMobile ? "" : "transform 0.15s ease-in-out",
                ":hover": isMobile
                  ? ""
                  : {
                      transform: "scale(1.05)",
                    },
              }}
            >
              <Button onClick={() => setAuthState("dashboard")}>
                <Typography variant="h4">Jung GPT</Typography>
              </Button>
              <Typography m={5}>
                Our very first Emotional Reflection Feedback tool. This tool is
                trained in psychology, psychiatry, philosophy, and medicine. It
                is used to help users gain clarity into how they might be
                feeling, and discover ways in which they might be able to help
                solve or deal with their day to day problems.
                <b>
                  <br />
                  <br />
                  Jung GPT is NOT a replacement for therapy. Please consult a
                  professional if you are having any thoughts of self harm or
                  suicidal ideation.
                </b>
              </Typography>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "90vw" : "40vw", // adjust for smaller screens
                backgroundColor: "#E8E1DC",
                borderRadius: "1em",
                margin: isMobile ? "1em 0" : "0em", // adjust for smaller screens
                padding: "1em",
                transition: isMobile ? "" : "transform 0.15s ease-in-out",
                ":hover": isMobile
                  ? ""
                  : {
                      transform: "scale(1.05)",
                    },
                marginBottom: isMobile ? "4em" : "0em", // adjust for smaller screens
              }}
            >
              <Button onClick={() => setAuthState("dbt")}>
                <Typography variant="h4">Jung DBT</Typography>
              </Button>
              <Typography m={5}>
                Our custom DBT centered tool. This tool is Dialectical
                Behavioral Therapy. It helps users reframe thoughts, learn DBT
                skills, and even gives them worksheets to work on based on their
                own personal issues.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
}
