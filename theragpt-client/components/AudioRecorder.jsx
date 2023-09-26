import React, { useState } from "react";
import { ReactMic } from "react-mic";
import Nav from "./Nav";
export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    // Do nothing with the blob for now
  };

  const onStop = async (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);

    // Prepare FormData
    const formData = new FormData();
    formData.append("audio", recordedBlob.blob);

    try {
      // Send audio blob to your '/whisper' endpoint
      const res = await fetch("/whisper", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Assuming your response object contains the transcribed and summarized text
      console.log("Summarized Text:", data.transcribedText);
    } catch (error) {
      console.log("Error uploading audio:", error);
    }
  };

  return (
    <div className="main">
      <div>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={startRecording} type="button">
          Start
        </button>
        <button onClick={stopRecording} type="button">
          Stop
        </button>
        <audio src={blobURL} controls="controls" />
      </div>
    </div>
  );
}
