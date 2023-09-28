import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import MenuPopupState from './MenuPopup';
import '@fortawesome/fontawesome-free/css/all.css';

export default function AudioRecorder({ setUserEmail, user }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [summaryMessage, setSummaryMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize MediaRecorder
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      })
      .catch((err) => console.error('Error getting audio stream:', err));
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
      setIsLoading(true); // Set loading state to true before starting the fetch request
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        console.log('Created audio blob:', audioBlob); // Log the audio blob
        console.log('Blob MIME type:', audioBlob.type); // Log MIME type
        try {
          // https://jung-gpt.onrender.com/whisper         http://localhost:3080/whisper
          const response = await fetch(
            'https://jung-gpt.onrender.com/whisper',
            {
              method: 'POST',
              body: formData,
            }
          );
          if (!response.ok) {
            console.log('Received server response:', response); // Log the response object
            const data = await response.json();
            console.log('Response JSON:', data); // Log the response data
          }

          const data = await response.json();
          setSummaryMessage(data.summaryMessage);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          res
            .status(500)
            .json({ error: 'An error occurred while processing the audio.' });
        }
      };
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <div className="main">
        <MenuPopupState setUserEmail={setUserEmail} user={user} />
      </div>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            marginTop: '3rem',
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
                color: !mediaRecorder ? 'gray' : 'red',
                fontSize: '24px',
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
                color: !mediaRecorder ? 'gray' : 'black',
                fontSize: '24px',
              }}
            ></i>
          </Button>
        </Box>
        {isLoading && (
          <div className="spinner"></div> // Replace with your preferred spinner component
        )}
        {/* Summary Message */}
        {summaryMessage && (
          <Box
            sx={{
              marginTop: '2rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '0.5rem',
              width: '80%',
              backgroundColor: 'whitesmoke',
            }}
          >
            <Typography variant="h6">Summary:</Typography>
            <Typography variant="body1">{summaryMessage}</Typography>
          </Box>
        )}
        <p
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            marginTop: '3rem',
            width: '50%',
          }}
        >
          Hi there! Thanks for checking out this demo component!
          <br />
          <br />
          WHAT YOU'LL NEED:
          <br />
          <br /> A computer microphone of any kind
          <br />
          <br /> This is a summarization model, it is instructed to take the
          dialogue of a client and therapist and summarize the converation for
          mental health professionals, scoring the key problem areas for
          severity and offering the provider feedback on action plans.
          <br />
          <br />
          To test, create fake dialogue or think from past sessions you yourself
          might have had. There is no need to worry about the bot picking up on
          "who is who" in the conversation. It naturally will. Simply speak into
          the bot simulating a therapy session with a friend or colleague, or
          have a fake conversation with yourself pretending to be two people.
          <br />
          <br />
          HERES HOW IT WORKS
          <br />
          <br />- Simply press record and start talking, if prompted, give
          browser permission to access your microphone.
          <br />- When done talking press "Stop", wait up to 20 seconds. (Sorry
          we know this is long)
          <br />- A prompt should appear on screen summarizing your
          conversation.
          <br />
          <br />
          Remember, if you are seeing this, Dr. Creighton has given you
          permission to access this software in its preliminary stage. This is
          very early prototyping of this model. All constructive feedback is
          welcome. But please understand there will be unforeseen bugs you will
          encounter. DO NOT use this in a real therapy session. This is for
          testing purposes.
        </p>
      </Box>
    </div>
  );
}
