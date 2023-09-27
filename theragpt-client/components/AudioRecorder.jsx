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
  Box,
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
import Stress from "./Stress";
import Dec3 from "/dec3.svg";
import Sub from "/SubAd.svg";
import ReactGA from "react-ga4";

export default function AudioRecorder({
  setUserEmail,
  setAuthState,
  user,
  subscriptionStatus,
  setSubscriptionStatus,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [summaryMessage, setSummaryMessage] = useState("");

  useEffect(() => {
    // Initialize MediaRecorder
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      })
      .catch((err) => console.error("Error getting audio stream:", err));
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      audioChunks.length = 0; // Clear old audio chunks
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.wav");

        console.log("Created audio blob:", audioBlob); // Log the audio blob
        console.log("Blob MIME type:", audioBlob.type); // Log MIME type
        try {
          // http://localhost:3080/whisper
          const response = await fetch(
            "https://jung-gpt.onrender.com/whisper",
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            console.log("Received server response:", response); // Log the response object
            const data = await response.json();
            console.log("Response JSON:", data); // Log the response data
          }

          const data = await response.json();
          setSummaryMessage(data.summaryMessage);
        } catch (error) {
          res
            .status(500)
            .json({ error: "An error occurred while processing the audio." });
        }
      };
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <div className="main">
        <MenuPopupState
          setUserEmail={setUserEmail}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Recording Indicator */}
        {isRecording && (
          <Typography variant="h6" color="error">
            Recording...
          </Typography>
        )}

        {/* Control Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button
            variant="outlined"
            onClick={startRecording}
            disabled={!mediaRecorder}
          >
            <i
              className="fas fa-circle"
              style={{
                color: !mediaRecorder ? "gray" : "red",
                fontSize: "24px",
              }}
            ></i>
          </Button>
          <Button
            variant="outlined"
            onClick={stopRecording}
            disabled={!mediaRecorder}
          >
            <i
              className="fas fa-square"
              style={{
                color: !mediaRecorder ? "gray" : "black",
                fontSize: "24px",
              }}
            ></i>
          </Button>
        </Box>

        {/* Summary Message */}
        {summaryMessage && (
          <Box
            sx={{
              marginTop: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h6">Summary:</Typography>
            <Typography variant="body1">{summaryMessage}</Typography>
          </Box>
        )}
      </Box>
    </div>
  );
}
