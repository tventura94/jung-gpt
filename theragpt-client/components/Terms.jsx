import React, { useState } from "react";
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
import MenuPopup from "../components/MenuPopup";

function Terms({ setUser, setAuthState, user }) {
  return (
    <div>
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Typography marginTop="2rem" variant="h4" align="center" gutterBottom>
        Terms of Service
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="80%" // Set the width of the Box to 80% of its parent
        margin="auto" // This centers the Box horizontally
      >
        <Typography
          display={"flex"}
          justifyContent="center"
          alignContent="center"
          width={0.8}
          variant="body1"
          paragraph
        >
          Welcome to JungGPT. The following Terms of Service ("TOS") contain the
          terms and conditions that govern your use of the JungGPT application
          ("Application") and the services provided by the Application
          ("Services"). By using the Application, you agree to be bound by these
          TOS, as they may be amended by JungGPT from time to time in its sole
          discretion.
          <br />
          <br />
          1. **License**: Subject to your compliance with these TOS, JungGPT
          grants you a limited, non-exclusive, non-transferable,
          non-sublicensable license to access and use the Application.
          <br />
          <br />
          2. **Eligibility**: By using the Application, you affirm that you are
          at least 18 years of age. JungGPT may, in its sole discretion, refuse
          to offer the Application to any person or entity and change its
          eligibility criteria at any time.
          <br />
          <br />
          3. **Purpose**: JungGPT is an AI model that assists individuals in
          understanding their emotions and provides insights. The tool is not
          meant to replace therapy but rather serves as an emotional reflection
          tool.
          <br />
          <br />
          4. **Privacy**: All conversations with JungGPT are private, and no
          data is stored or accessible from these interactions unless explicitly
          stated.
          <br />
          <br />
          5. **Medical Assistance**: You understand that the Services do not
          provide any medical, diagnosis, or treatment. In case of a medical
          emergency, please contact your local healthcare provider.
          <br />
          <br />
          6. **Limitation of Liability**: In no event will JungGPT, its
          officers, directors, employees or agents, be liable to you for any
          damages whatsoever, including without limitation indirect, incidental,
          special, punitive, or consequential damages arising out of or in
          connection with your use of the Application or Services, whether the
          damages are foreseeable and whether or not JungGPT has been advised of
          the possibility of such damages. The foregoing limitation of liability
          will apply to the fullest extent permitted by law in the applicable
          jurisdiction.
          <br />
          <br />
          7. **Amendments**: JungGPT reserves the right to modify or replace any
          of these TOS at any time by posting a notice on the Application. It is
          your responsibility to check these TOS periodically for changes.
          <br />
          <br />
          8. **Governing Law**: These TOS are governed by the laws of the
          jurisdiction in which JungGPT operates. Any disputes arising out of
          these TOS will be adjudicated in the courts of that jurisdiction.
          <br />
          <br />
          Last updated on 7/12/23
        </Typography>
        {/* Add more sections as per the needs */}
      </Box>
    </div>
  );
}

export default Terms;
