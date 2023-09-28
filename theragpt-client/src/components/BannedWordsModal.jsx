import Link from "next/link";
import React from "react";
import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@fortawesome/fontawesome-free/css/all.css";

export function BannedWordsModal(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={props.show}
      onClose={props.onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          margin: "0 auto",
          width: isMobile ? "80vw" : "50vw",
          maxHeight: isMobile ? "80vh" : "90vh",
          overflowY: isMobile ? "scroll" : "visible",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: "30px",
          textAlign: "center",
          fontFamily: "Montseratt",

          // Styles for the scrollbar
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "League Spartan",
          }}
          id="modal-title"
          variant="h4"
          component="h2"
        >
          Hey there...
        </Typography>
        <Typography
          sx={{
            fontFamily: "League Spartan",
            fontSize: "1.2rem",
          }}
          id="modal-description"
          variant="body1"
        >
          It sounds like you might be going through a tough time. I promise you
          everybody on this team gets it, and thats why we work tirelessly to
          offer all of our users the support they deserve. Our AI is simply not
          ready to talk about serious issues like this. A lot of people have
          expressed they would prefer to talk to JungGPT about these things.
          Unfortunately, the technology just isnt there to handle sensitive
          stuff like this. Please reach out to a friend, or family member who
          loves you, or a therapist in your area.{" "}
          <b> Here we've listed some resources for you: </b>
        </Typography>
        <Typography
          sx={{
            fontFamily: "League Spartan",
          }}
          variant="body1"
        >
          Suicide Hotline: (USA) <a href="tel:988">988</a>
        </Typography>
        <Link href="https://portal.cca.edu/thriving/caps/international-mental-health-support/">
          International Mental Health Support Directory
        </Link>
        <Typography
          sx={{
            fontFamily: "League Spartan",
          }}
        >
          If you are in the US, please call or text 988 to be connected with a
          live therapist 24/7
        </Typography>

        <Typography
          sx={{
            fontFamily: "League Spartan",
          }}
        >
          You are worth it. We know that because the person who created this app
          once felt a similar way to how you may be feeling. You can come out
          the other side and do wonderful things.
        </Typography>
        <Typography
          sx={{
            fontFamily: "League Spartan",
          }}
          variant="body1"
        >
          We know this isn't the best and that you know how to Google, but if
          you're open to it, therapy DOES help with the right therapist:
        </Typography>
        {/* For the map, you can integrate Google Maps or any other mapping service here */}
        <div style={{ height: isMobile ? "500px" : "500px", width: "100%" }}>
          <iframe
            src="https://www.psychologytoday.com/us/therapists"
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <Button variant="contained" onClick={props.onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
