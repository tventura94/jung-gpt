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
  TextField,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuPopupState from "./MenuPopup";
import GoldLogo from "/gpt-gold.png"; // Import the GoldLogo image
import MainLogo from "/will.png";
import { useEffect, useState } from "react";
import DbtLogo from "/jungSmart.png";
import JungFace from "/gpt-text-1.png";
import JungAdmat from "/jung-rev.png";
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
import Faq from "./Faq";

export default function Selector({ setUserEmail, setAuthState, user }) {
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free Plan");
  const [logoSrc, setLogoSrc] = useState(MainLogo);
  const [checkedSecond, setCheckedSecond] = React.useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"),
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];

        if (newSub) {
          console.log(`Account is ${newSub.status}`);
          if (newSub.status === "active") {
            setSubscriptionStatus("Premium");
            setLogoSrc(GoldLogo);
          } else {
            setSubscriptionStatus(newSub.status);
            setLogoSrc(MainLogo);
          }
        } else {
          console.log("Account not active");
          setSubscriptionStatus("Free Plan");
          setLogoSrc(MainLogo);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData(user.email);
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchData();
  }, [user.email]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMed = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleTermsClick = (e) => {
    e.preventDefault();
    setAuthState("terms");
  };

  React.useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("hasAcceptedTerms");

    if (!hasAcceptedTerms) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (bothChecked) {
      localStorage.setItem("hasAcceptedTerms", "true");
      setOpen(false);
    }
  };

  const bothChecked = checked && checkedSecond;

  const handleCheckboxChange = (event, checkedSetter) => {
    checkedSetter(event.target.checked);
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
    minWidth: "500px",
    margin: isMobile ? "1em 0" : "0",
    transition: isMobile ? "" : "transform 0.15s ease-in-out",
    ":hover": isMobile ? "" : { transform: "scale(1.05)" },
    fontFamily: "'Roboto Slab', serif",
    lineHeight: "1.6rem",
    maxHeight: "85vh",
    "@media (max-width: 1096px)": {
      minWidth: "400px",
    },
    border: "2px solid silver",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  };

  return (
    <div className="jung-background-2" style={{ boxSizing: "border-box" }}>
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
        className="div"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            margin: isMobile ? "3rem" : "0",
            backgroundColor: isMobile ? "" : "whitesmoke",
            borderRadius: "30px",
            padding: isMobile ? "" : "2.5rem",
            marginTop: isMobile ? "1rem" : "3rem",
          }}
        >
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <Box sx={boxStyles}>
              <Button
                style={{
                  width: "18rem",
                  height: "8rem",
                }}
                onClick={() => setAuthState("dashboard")}
              >
                <img
                  style={{
                    // add this line
                    width: "18rem",
                  }}
                  src={logoSrc} // Use the logoSrc state variable here
                />
              </Button>
              <p
                style={{
                  wordWrap: "break-word", // add this line
                  width: "80%",
                  maxWidth: "100%", // add this line
                  marginBottom: "3rem",
                  lineHeight: "2rem",
                }}
              >
                <b>Our very first Emotional Reflection Feedback tool</b> <br />
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
              <div
                style={{
                  position: "relative",
                  cursor:
                    subscriptionStatus === "Premium"
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                <Tooltip
                  style={{
                    fontSize: "40px",
                  }}
                  title="Sorry, this is only for our Premium Members!"
                  arrow
                  disableHoverListener={subscriptionStatus === "Premium"}
                  placement="top"
                >
                  <div>
                    <Button
                      style={{
                        width: "100%",
                        height: "8rem",
                      }}
                      onClick={() => {
                        if (subscriptionStatus === "Premium") {
                          setAuthState("dbt");
                        }
                      }}
                      disabled={subscriptionStatus !== "Premium"}
                    >
                      <img
                        style={{
                          width: "18rem",
                        }}
                        src={DbtLogo}
                      />
                    </Button>
                  </div>
                </Tooltip>
              </div>
              <p
                style={{
                  width: "80%",
                  marginBottom: "3rem",
                  lineHeight: "2rem",
                }}
              >
                <b>Our groundbreaking SMART Tool, JungSMART</b> <br />
                SMART stands for Specific, Measurable, Achievable, Relevant, and
                Time-bound, which are all critical aspects of effective goal
                setting. This AI assistant helps users create SMART goals and
                action plans.
              </p>
            </Box>
          </motion.div>
        </Box>
      </div>

      {/* Terms of Service Dialog */}
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">Terms of Service</DialogTitle>
        <DialogContent>
          <Paper
            style={{
              maxHeight: "50vh",
              overflow: "auto",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="body1">
              {/* Replace this with your actual Terms of Service text */}
              {`Welcome to JungGPT. The following Terms of Service ("TOS") contain the terms and conditions that govern your use of the JungGPT application ("Application") and the services provided by the Application ("Services"). By using the Application, you agree to be bound by these TOS, as they may be amended by Ventura UX, LLC from time to time in its sole discretion.

1. **License**: Subject to your compliance with these Terms of Service (TOS), Ventura UX, LLC grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Application. This license is for your personal and non-commercial use only. This means that you are permitted to use the Application as it is provided to you by Ventura UX, LLC, but you may not copy, modify, distribute, sell, or lease any part of the Application, nor may you reverse engineer or attempt to extract the source code of the software, unless laws prohibit those restrictions or you have our written permission. The Application and its original content, features, and functionality are owned by Ventura UX, LLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Any rights not expressly granted herein are reserved by Ventura UX, LLC. Your use of the Application does not grant you any right, title, or interest in the Application or the content in the Application. Please note that we may revoke this license at our discretion, without notice and without liability, for any reason or for no reason. Any unauthorized use of the Application terminates the permissions and/or licenses granted by Ventura UX LLC pursuant to these TOS. Also, you agree to respect all copyright and other legal notices, information, and restrictions contained in any content accessed through the Application. You also agree not to change, translate, or otherwise create derivative works of the Application. This license will remain in effect unless and until you violate these TOS or this license is terminated by you or Ventura UX, LLC.

2. **Eligibility**: By using the Application, you affirm that you are at least 18 years of age. The Application is intended for use by individuals who are 18 years or older. If you are under 18 years of age, you may only use the Application with the consent and supervision of a parent or legal guardian. By using the Application, you represent and warrant that you have reached the age of majority in your jurisdiction or that you have obtained the necessary consent from your parent or legal guardian to use the Application. Ventura UX, LLC reserves the right, in its sole discretion, to refuse to offer the Application to any person or entity and to change the eligibility criteria at any time without prior notice. By accessing or using the Application, you acknowledge and agree that Ventura UX, LLC shall not be liable for any consequences or damages resulting from your use of the Application in violation of these eligibility requirements. It is your responsibility to ensure that you meet the eligibility criteria before using the Application. If you do not meet the specified eligibility requirements, you should refrain from using the Application and discontinue any ongoing use immediately.

3. **Purpose**: JungGPT is an AI model designed to assist individuals in understanding their emotions and providing insights. The primary purpose of the tool is to serve as an emotional reflection tool and provide a platform for individuals to explore their thoughts and feelings. It is important to note that JungGPT is not intended to replace professional therapy or serve as a substitute for mental health treatment. While it may provide support and guidance, it does not constitute medical advice, diagnosis, or treatment. JungGPT should be used as a tool to complement and enhance personal growth and self-awareness. It can offer reflections, suggestions, and insights based on its training and knowledge in the fields of psychology, psychiatry, medicine, and philosophy. It is essential to understand that the information provided by JungGPT should not be relied upon as a substitute for professional advice or treatment from qualified mental health professionals. If you are experiencing a mental health crisis, have severe emotional distress, or require immediate assistance, it is crucial to seek help from a licensed therapist, counselor, or healthcare provider. By using JungGPT, you acknowledge and understand that it is not a substitute for professional therapy or treatment. You are solely responsible for your well-being and should use the tool at your own discretion, taking into consideration your individual circumstances and seeking appropriate professional help when needed. JungGPT aims to provide a supportive and empathetic environment to help individuals explore and understand their emotions, but it is important to prioritize your mental health and consult with qualified professionals for personalized and comprehensive assistance.

4. **Privacy**: At Ventura UX, LLC, we prioritize the privacy and confidentiality of our users. We want you to feel secure when using our application. That's why we want to assure you that we do not store or retain any personal data beyond your username. All conversations with JungGPT are private and confidential. We do not collect, store, or have access to any information shared during these interactions. Your username is used solely for the purpose of identifying and personalizing your experience within the application. We have implemented stringent security measures to protect your privacy and ensure that your conversations remain confidential. Our systems are designed to prevent unauthorized access or disclosure of your information. Rest assured that your personal details, including your identity, location, and the content of your conversations, are not stored or accessible by us. We respect your privacy and strive to provide a safe and secure environment for your interactions with JungGPT. If you have any concerns or questions regarding your privacy or data security, please feel free to reach out to our support team. We are here to address any inquiries and provide further clarification on our privacy practices. Our commitment to privacy means that your personal data is not collected, stored, or shared beyond your username. You can engage with JungGPT knowing that your privacy is respected and protected.

5. **Medical Assistance**: It is important to note that the Services provided by JungGPT are not intended to replace professional medical advice, diagnosis, or treatment. While JungGPT can assist in understanding emotions and providing insights, it is not a substitute for medical or mental health care. The information and guidance provided by JungGPT should not be considered as medical, psychiatric, or therapeutic advice. It is always recommended that you consult with qualified healthcare professionals, such as doctors, therapists, or counselors, for any medical or mental health concerns. If you are experiencing a medical emergency or require immediate medical attention, please contact your local healthcare provider or emergency services right away. JungGPT is not designed or equipped to handle medical emergencies, and timely medical assistance should always be sought in such situations. While JungGPT aims to provide support and guidance, it cannot provide a diagnosis or treatment plan for any medical or mental health condition. The responsibility for making decisions about your health and well-being lies with you and your healthcare providers. By using the Services, you acknowledge and understand that JungGPT is not a substitute for professional medical or mental health care. It is essential to seek appropriate medical advice and treatment from qualified professionals for any health-related concerns or conditions. JungGPT encourages you to prioritize your health and well-being and seeks to complement, not replace, the care provided by medical and mental health professionals. Always consult with healthcare providers who are familiar with your specific circumstances and can provide personalized advice and treatment options. Please consult our Terms of Service and Privacy Policy for further details regarding the limitations of the Services and your responsibilities as a user.

6. **Limitation of Liability**: Ventura UX, its officers, directors, employees, or agents shall not be held liable for any damages arising out of or in connection with your use of the Application or Services. This includes, but is not limited to, indirect, incidental, special, punitive, or consequential damages, regardless of whether such damages are foreseeable or Ventura UX, LLC, has been advised of the possibility of such damages. By using the Application and Services, you agree that Ventura UX, LLC, shall not be responsible for any direct or indirect harm, loss, or damage that may result from your interactions with the Application or Services. This includes, but is not limited to, any errors or inaccuracies in the information provided by JungGPT, any interruption or cessation of services, or any unauthorized access to or use of your personal information. The foregoing limitation of liability applies to the fullest extent permitted by law in the applicable jurisdiction. It is important to understand that while JungGPT strives to provide accurate and reliable information, there may be limitations and inherent risks associated with the use of an AI language model. Therefore, it is your responsibility to use the Application and Services at your own discretion and assess the suitability and accuracy of the information provided. JungGPT encourages you to exercise caution and seek professional advice when appropriate. The limitations of liability outlined in these Terms of Service are designed to protect Ventura UX, LLC and its affiliates to the fullest extent permitted by law, and by using the Application and Services, you acknowledge and accept these limitations.

7. **User Responsibilities**: By using the Application and Services, you agree to comply with all applicable laws, regulations, and guidelines. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree not to use the Application for any unlawful or unauthorized purposes and to refrain from engaging in any activity that may disrupt or interfere with the proper functioning of the Application or Services.

8. **Intellectual Property**: All intellectual property rights in the Application and Services, including but not limited to trademarks, logos, graphics, and content, are owned by or licensed to Ventura UX, LLC. You agree not to use, modify, reproduce, distribute, or exploit any intellectual property without the explicit permission of Ventura UX, LLC.

9. **Termination**: Ventura UX, LLC reserves the right to suspend or terminate your access to the Application and Services at any time, with or without cause or notice. In the event of termination, you will no longer have access to your account or any data associated with it.

10. **Third-Party Links**: The Application and Services may contain links to third-party websites or resources. JungGPT is not responsible for the availability, accuracy, or content of such external sites or resources. You acknowledge and agree that JungGPT is not liable for any loss or damage caused by your use of any third-party websites or resources.

11. **Indemnification**: You agree to indemnify and hold Ventura UX, LLC, its officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, or expenses arising out of or in connection with your use of the Application or Services, including any violation of these Terms of Service.

12. **Governing Law**: These TOS are governed by the laws of the jurisdiction in which Ventura UX operates. Any disputes arising out of these TOS will be adjudicated in the courts of that jurisdiction.

13. **Amendments**: Ventura UX, LLC, reserves the right to modify or replace any of these TOS at any time by posting a notice on the Application. It is your responsibility to check these TOS periodically for changes.

14. **Entire Agreement**: These Terms of Service constitute the entire agreement between you and Ventura UX, LLC, regarding the use of the Application and Services, superseding any prior agreements or understandings.

Last updated on 7/12/23 `}
            </Typography>
          </Paper>
          <FormControlLabel
            sx={{
              marginBottom: "1rem",
            }}
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => handleCheckboxChange(e, setChecked)}
              />
            }
            label="By continuing, you agree to our Terms of Service"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedSecond}
                onChange={(e) => handleCheckboxChange(e, setCheckedSecond)}
              />
            }
            label="I understand that this platform provides AI chat-based support and is NOT a replacement for professional mental health services.
             This service does not constitute mental health therapy, counseling, medical or psychological diagnosis, or professional mental health advice.
              If I am in crisis, feel like I may harm myself or others, I understand it is essential to seek immediate professional help."
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={!bothChecked}
            disableBackdropClick
            disableEscapeKeyDown
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          marginTop: isMobile ? "" : "3rem",
        }}
      >
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
              marginBottom: "1rem",
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
                textAlign: "center",
                marginLeft: isMobile ? "" : "4rem",
                marginRight: isMobile ? "" : "2rem",
                lineHeight: "29px",
              }}
            >
              <b>
                Get real relief now chatting with our highly customized
                Emotional Reflection Feedback Tool! The first AI of its kind!
              </b>{" "}
              <br /> <br />
              JungGPT was developed by the ingenuity of web developers and
              psychologists working together at Ventura UX to realize the
              potentiallity of a tool that could be used to help people work
              through their emotional states, conflicting thoughts and feelings,
              and negative self-talk.
            </Typography>
          </div>
          <Typography
            variant="body1"
            style={{
              fontSize: "25px",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
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
                  JungGPT is absolutely not therapy and should not be
                  interpreted as such.
                  <br />
                  <br />
                  <b>In no way</b> does anyone at Ventura UX, believe that this
                  tool is a replacement for the therapeutic relationship.
                  Therapy is based on understanding, trust, and as stated - a
                  relationship. JungGPT is an first of its kind ERF (Emotional
                  Reflection Feedback) Tool. It takes the users input, and based
                  on the data its been trained on, analyzes the emotional
                  context of your situation. It then offers a way to reframe
                  your thoughts or the situation, and asks you questions to help
                  you gain clarity about what you're going through.
                  <br />
                  <br />
                  It is important to understand you get out of JungGPT what you
                  put in. Try and use it in the moment, with a real life problem
                  you are struggling with. However, if you are struggling with
                  serious depression, suicidality, or thoughts of harming
                  others, JungGPT is NOT the tool to use. Please seek the
                  guidance of a professional mental health counselor, and we
                  also hope you reach out to a friend or family member who loves
                  you that you can talk to. Your safety is incredibly important
                  to your friends, your family, and to us, its never worth it to
                  risk it. Seek help if you're feeling truly awful, connection
                  with others and self-exploration with the help of a trained
                  professional are vital steps toward growth and healing.
                  <br />
                  <br /> While JungGPT does have a "form" of empathy, it does
                  not feel empathy itself, but understands it based on its
                  training to do so and through analyzing text in different
                  context. It is our belief at Ventura UX that based on its
                  extensive training on all types of text, it has gathered the
                  ability to logically deduce a simulacrum of empathy and ask
                  questions to prompt the user to gain clarity about their
                  situation and emotions, affectively becoming a truly nonbiased
                  ear to talk to.
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
                  creatively work with the user in an meaningful interaction
                  using this information. We are truly benevolent in our goal to
                  give people a tool that can help them with their emotions, we
                  wish to create a better world, alas things aren't free! We
                  need your help to run the app!
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
                  If you subscribe, you gain unlimited messaging and access to
                  all models current and future. <br />
                  You are helping a small team keep a very helpful product
                  alive. <br />
                  <br />
                  By helping keep this app alive, you are also helping members
                  who find this this app useful but cannot afford the premium
                  tool.
                  <br />
                  If you believe in this technology and its benefits, consider
                  subscribing! You are helping keep this up for those who are
                  less fortunate!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ marginBottom: "16px", marginTop: "16px" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Do you store data of our conversations?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  NO! We never read your conversations!
                  <br />
                  <br /> We do not store your data, we never read your
                  conversations, and privacy is of the utmost importance to us,
                  however, we have trained a highly customized LLM provided by
                  the OpenAI API, their policy on data-collection can be seen{" "}
                  <a href="https://openai.com/policies/api-data-usage-policies">
                    here.
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* Add more Accordion components for more FAQ items */}
          </div>
        </div>
      </div>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          padding: "2rem",
          width: isMobile ? "90%" : "40%",
        }}
      >
        {" "}
        <Typography
          variant="body1"
          style={{
            fontSize: "25px",
            marginTop: "0rem",
            marginBottom: "2rem",
            width: "100%",
          }}
        >
          <b>Let us know how you feel!</b>
        </Typography>
        <Typography
          variant="body1"
          style={{
            justifySelf: "center",
            alignSelf: "center",
            textAlign: "center",
            marginBottom: "1rem",
            width: "100%",
            lineHeight: "35px",
          }}
        >
          We value user feedback greatly.
          <br /> Please feel free to contact us for more information or to
          submit your meaningful interactions or buggy interactions so we can
          further improve the software.
        </Typography>
        <Box
          sx={{
            justifySelf: "center",
            alignSelf: "center",
            textAlign: "center",
            marginBottom: "1rem",
            marginTop: "3rem",
            width: "100%",
            backgroundColor: "#5B6B7F",
            borderRadius: "10px",
            padding: ".5rem",
            width: isMobile ? "100%" : "100%",
          }}
        >
          <Typography
            sx={{
              margin: ".5rem",

              color: "white",
              fontSize: "1rem",
            }}
          >
            {" "}
            Contact:
          </Typography>
          <Typography
            sx={{
              margin: ".7rem",
              color: "white",

              fontSize: ".9rem",
            }}
          >
            tom@ventura-ux.com
          </Typography>

          <Typography
            sx={{
              margin: ".7rem",

              color: "white",
              fontSize: ".8rem",
            }}
          >
            We look forward to hearing from you!
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
