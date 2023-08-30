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
  Tooltip,
  styled,
  makeStyles,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JungAdmat from "/jung-admat-1.png";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuPopupState from "./MenuPopup";
import GoldLogo from "/gpt-gold.png"; // Import the GoldLogo image
import MainLogo from "/will.png";
import { useEffect, useState } from "react";
import DbtLogo from "/jung-dbt.png";
import JungFace from "/gpt-text-1.png";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { getUserData, db } from "./Fire";

const Faq = ({ setUserEmail, setAuthState, user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
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
          margin: "0 auto",
          width: isMobile ? "90%" : "50%",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            style={{
              borderRadius: "16px",
              marginBottom: "1rem",
              marginTop: "2rem",
              width: isMobile ? " 100%" : "50%",
            }}
            src={JungAdmat}
            alt="admat"
          />
          <Typography
            variant="body1"
            style={{
              marginTop: isMobile ? "2rem" : "",
              textAlign: "left",
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          >
            <b>
              Ventura UX is committed to transparency, let us answer some
              questions for you!
            </b>{" "}
            <br /> <br />
            JungGPT was developed by the creativity of web developers and
            psychologists working together at Ventura UX to realize the
            potentiallity of a tool that could be used to help people work
            through their emotional states, conflicting thoughts and feelings,
            and negative self-talk.
            <br /> <br />
            We are a SMALL team that is committed to delivering a quality tool
            to the public that can benefit the lives of its daily users. We have
            trained a tool based on our OWN data and sophisticated prompt
            engineering.
          </Typography>
        </div>
        <Typography
          variant="body1"
          style={{ fontSize: "25px", marginTop: "1rem" }}
        >
          <b>Frequently Asked Questions</b>
        </Typography>
        <div>
          <Accordion style={{ marginTop: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Is this some sort of attempt to replace therapists with AI?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  textAlign: "left",
                }}
              >
                Nope... And even if we were... we just don't have that kind of
                influence. <br />
                <br />
                JungGPT is absolutely not therapy and should not be interpreted
                as such.
                <br />
                <br />
                <b>In no way</b> does anyone at Ventura UX, believe that this
                tool is a replacement for the therapeutic relationship. Therapy
                is based on understanding, trust, and as stated - a
                relationship. JungGPT is an first of its kind ERF (Emotional
                Reflection Feedback) Tool. It takes the users input, and based
                on the data its been trained on, analyzes the emotional context
                of your situation. It then offers a way to reframe your thoughts
                or the situation, and asks you questions to help you gain
                clarity about what you're going through.
                <br />
                <br />
                It is important to understand you get out of JungGPT what you
                put in. Try and use it in the moment, with a real life problem
                you are struggling with. However, if you are struggling with
                serious depression, suicidality, or thoughts of harming others,
                JungGPT is NOT the tool to use. Please seek the guidance of a
                professional mental health counselor, and we also hope you reach
                out to a friend or family member who loves you that you can talk
                to. Your safety is incredibly important to your friends, your
                family, and to us, its never worth it to risk it. Seek help if
                you're feeling truly awful. Connection with others and
                self-exploration with the help of a trained professional are
                vital steps toward growth and healing.
                <br />
                <br /> While JungGPT does have a "form" of empathy, it does not
                feel empathy itself, but understands it based on its training to
                do so and through analyzing text in different context. It is our
                belief at Ventura UX that based on its extensive training on all
                types of text, it has gathered the ability to logically deduce a
                simulacrum of empathy and ask questions to prompt the user to
                gain clarity about their situation and emotions, becoming a
                truly nonbiased ear to talk to.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ marginTop: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                I've never seen something like this. How can I trust it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                This is an AI trained on trillions of data points about
                psychology, and has been trained on a large amount of text.
                Because of this, we've found that while JungGPT may not be
                "sentient" it still has the ability to decode linguistic
                information for its inherent emotional context, and then
                creatively work with the user in an meaningful interaction using
                this information. We are truly benevolent in our goal to give
                people a tool that can help them with their emotions, we wish to
                create a better world, alas things aren't free! We need your
                help to run the app!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ marginTop: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What are the benefits of subscribing?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  textAlign: "left",
                }}
              >
                If you subscribe, you gain unlimited messaging and access to all
                models current and future. <br />
                You are helping a small team keep a very helpful product alive.{" "}
                <br />
                <br />
                By helping keep this app alive, you are also helping members who
                find this this app useful but cannot afford the premium tool.
                <br />
                If you believe in this technology and its benefits, consider
                subscribing! You are helping keep this up for those who are less
                fortunate!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ marginTop: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Do you store data of our conversations?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We do store the data of conversations for legal purposes within
                a double-encrypted server, we cannot read your conversations,
                and privacy is of the utmost importance to us. What we do read
                and collect is your usage amount on the app, how many words per
                message you send, how many characters per message you send, your
                demographics and what time you message at. We do not sell your
                data to any third-parties. We do not use your data to train our
                models.
                <br />
                <br /> All data is kept strictly confidential in a private
                database that is double encrypted by both us and Google.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ marginBottom: "32px", marginTop: "16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Is JungGPT Multilingual?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{
                  textAlign: "left",
                }}
              >
                Yes! JungGPT is fluent in almost every modern language! Making
                it an effective companion for all citizens around the globe!
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Add more Accordion components for more FAQ items */}
        </div>
      </div>
    </div>
  );
};

export default Faq;
