import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  Grid,
  TextField,
} from "@mui/material";
import { BannedWordsModal } from "./BannedWordsModal";
import MenuPopupState from "./MenuPopup";
import Fire from "./Fire";
import { getUserData } from "./Fire";
import "@fortawesome/fontawesome-free/css/all.css";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { db } from "../components/Fire";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { logPageView } from "../components/Fire";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { serverTimestamp } from "firebase/firestore"; // Import serverTimestamp function
import { Timestamp } from "firebase/firestore";
import ButtonCanva from "/button.png";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Stress() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const toggleStressWindow = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const videoContainerStyle = {
    display: "flex",
    position: isMobile ? "" : "absolute",
    width: isMobile ? "150px " : "250px",
    height: isMobile ? "84px " : "141px",
    zIndex: 1000,
    background: "#fff",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
    borderRadius: "30px",
  };

  return (
    <div
      style={{
        paddingTop: isMobile ? ".5rem" : "1rem",
      }}
    >
      {!open && (
        <Button
          variant="contained"
          onClick={toggleStressWindow}
          sx={{
            position: "absolute",
            color: "white",
            backgroundColor: "#F44F4F",
            marginLeft: "1rem",
            marginTop: "1rem",
          }}
        >
          <YouTubeIcon />
        </Button>
      )}
      {open && (
        <div style={videoContainerStyle}>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
            size="small"
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/G-n3IKnGI5U?si=g6H4TtqnbYau1oYE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
