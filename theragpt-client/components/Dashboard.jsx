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

export default function Dashboard({
  setUserEmail,
  setAuthState,
  user,
  subscriptionStatus,
  setSubscriptionStatus,
}) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [trialLimitReached, setTrialLimitReached] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 768);
  const [showDeveloperNotes, setShowDeveloperNotes] = useState(true);
  const [warningPopup, setWarningPopup] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [open, setOpen] = useState(true);

  // Emotion / Interests Select overlay
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [typedInterest, setTypedInterest] = useState("");
  const [interestsData, setInterestsData] = useState(null);
  const [isOldChat, setIsOldChat] = useState(false);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotions((prev) => {
      if (prev.includes(emotion)) {
        return prev.filter((e) => e !== emotion);
      } else {
        return [...prev, emotion];
      }
    });
  };

  async function encryptText(plainText, blackAlpaca) {
    const textEncoder = new TextEncoder();
    const textBuffer = textEncoder.encode(plainText);
    const passwordBuffer = textEncoder.encode(blackAlpaca);

    const passwordKey = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: passwordBuffer,
        iterations: 1000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: passwordBuffer,
      },
      key,
      textBuffer
    );

    return new Uint8Array(encrypted);
  }

  const sendMessageToFirebase = async (userText, assistantText, tokenData) => {
    // Encryption
    const blackAlpaca = "x1!,54372usjw!";
    const encryptedUserText = await encryptText(userText, blackAlpaca);
    const encryptedAssistantText = await encryptText(
      assistantText,
      blackAlpaca
    );

    // Convert encrypted Uint8Array to Base64 for easier storage and compatibility
    const encryptedUserTextBase64 = btoa(
      String.fromCharCode(...encryptedUserText)
    );
    const encryptedAssistantTextBase64 = btoa(
      String.fromCharCode(...encryptedAssistantText)
    );
    const userWordCount = userText
      .split(" ")
      .filter((word) => word !== "").length;
    const userCharCount = userText.length;
    const assistantWordCount = assistantText
      .split(" ")
      .filter((word) => word !== "").length;
    const assistantCharCount = assistantText.length;

    const userRef = doc(db, "users", user.uid);
    const messagesRef = collection(userRef, "messages");

    try {
      await addDoc(messagesRef, {
        user_text: encryptedUserTextBase64, // Encrypted User's message text in Base64
        assistant_text: encryptedAssistantTextBase64,
        user_word_count: userWordCount,
        user_char_count: userCharCount,
        usage: tokenData, // convert object to JSON string
        assistant_word_count: assistantWordCount,
        assistant_char_count: assistantCharCount,
        timestamp: serverTimestamp(), // Timestamp for the entire conversation
      });
    } catch (error) {
      console.error("Error writing message data: ", error);
    }
  };

  const getInterestsFromFirebase = async () => {
    const userRef = doc(db, "users", user.uid); // Document reference
    const interestsCollectionRef = collection(userRef, "interests"); // Subcollection reference

    const querySnapshot = await getDocs(interestsCollectionRef);

    querySnapshot.forEach((doc) => {
      const interestsData = doc.data();
      setSelectedInterests(interestsData.selectedInterests); // Update your local state
    });
  };

  useEffect(() => {
    getInterestsFromFirebase();
  }, []);

  const handleInterestClick = (interest) => {
    setSelectedInterests((prev) => {
      const newSelectedInterests = prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest];

      // Define a function to send the new state to Firebase
      const sendInterestsToFirebase = () => {
        const userRef = doc(db, "users", user.uid); // Document reference
        const interestRef = collection(userRef, "interests"); // Subcollection reference

        const newInterestDoc = doc(interestRef, user.uid); // New document reference within the subcollection

        setDoc(newInterestDoc, {
          // Define the document
          selectedInterests: newSelectedInterests,
          typedInterest: typedInterest,
        })
          .then(() => {
            console.log("");
          })
          .catch((error) => {
            console.error("Error writing interests: ", error);
          });
      };
      // Call the function to send the new interests to Firebase
      sendInterestsToFirebase();

      // Return the new state to update the selectedInterests state variable
      return newSelectedInterests;
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData(user.email);
      } catch (error) {
        // Handle any potential errors
      }
    };

    fetchData();
  }, [user.email]);

  // I dont think these two use effects do anything?? but I'm too scared to find out!
  useEffect(() => {
    logPageView("/Dashboard");
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      const handleLoad = () => {
        setPageLoaded(true);
      };
      window.addEventListener("load", handleLoad);

      // Cleanup
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Subscription pay wall logic - if the user isnt subscribed they get 20 messages total, and a warning popup at 14 messages.
  useEffect(() => {
    if (subscriptionStatus !== "active") {
      if (chatLog.length >= 10) {
        setTrialLimitReached(true);
      } else if (chatLog.length === 6) {
        setWarningPopup(true); // Show the warning popup at the 9th message
      }
    } else {
      setTrialLimitReached(false);
      setWarningPopup(false);
    }
  }, [chatLog, subscriptionStatus]);

  const handleWarningClose = () => {
    setWarningPopup(false);
  };

  // Firebase - Check user sub

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"), // Updated document reference
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];

        if (newSub) {
          setSubscriptionStatus(newSub.status);
        } else {
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid, setSubscriptionStatus]);

  function autosize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  // Go to different pages
  function handleUpgrade() {
    setAuthState("upgrade");
  }

  function backButton() {
    setAuthState("selector");
  }

  // Chat Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        7 - Math.floor((currentTime - lastMessageTime) / 1000)
      );

      setTimer(remainingTime);

      if (remainingTime === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastMessageTime]);

  // Submit Message Logic - 7 Second Wait Timer
  async function handleSubmit(e) {
    e.preventDefault();

    const currentTime = Date.now();
    if (currentTime - lastMessageTime < 7000) {
      // Less than 7 seconds since the last message, so return without sending
      alert("You must wait 7 seconds between messages.");
      return;
    }

    // Update the last message time
    setLastMessageTime(currentTime);

    if (trialLimitReached) {
      return;
    }
    const userId = user ? user.email : null; // Get the UID from the user object

    let chatLogNew = [...chatLog, { role: "user", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    // Fetch to backend
    const response = await fetch("https://jung-gpt.onrender.com/jung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: chatLogNew,
        userId: userId,
        emotions: selectedEmotions, // send the selected emotions
        interests: selectedInterests, // send the selected interests
        typedInterest: typedInterest,
        localHour: new Date().getHours(),
      }),
    });

    const data = await response.json();

    const tokenData = data.usage;
    const assistantMessage = `${data.message}`;

    setChatLog([
      ...chatLogNew,
      { role: "assistant", message: `${data.message}` },
    ]);
    sendMessageToFirebase(input, assistantMessage, tokenData);
  }
  const [chatHistories, setChatHistories] = useState([]);

  async function fetchChatHistories() {
    const chatCollection = collection(db, "users", user.uid, "chats");
    const chatSnapshot = await getDocs(chatCollection);
    const allChats = chatSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChatHistories(allChats);
  }

  useEffect(() => {
    fetchChatHistories();
  }, []); // Empty

  async function clearChat(e) {
    e.stopPropagation();

    // Only proceed if chatLog is not empty
    if (chatLog.length > 0) {
      // Check if chatLog is already in chatHistories
      const isDuplicate = chatHistories.some(
        (history) => JSON.stringify(history.chatLog) === JSON.stringify(chatLog)
      );

      if (!isDuplicate) {
        // Store the chat in Firebase with current date
        const chatCollection = collection(db, "users", user.uid, "chats");
        const docRef = await addDoc(chatCollection, {
          chatLog: chatLog,
          date: Timestamp.now(), // This will add the current date and time
        });

        // Update chatHistories state to include the new chat
        const newChat = {
          id: docRef.id,
          chatLog: chatLog,
          date: Timestamp.now(),
        };
        setChatHistories((prevChats) => [...prevChats, newChat]);
      }

      // Clear current chat
      setChatLog([]);
      setTrialLimitReached(false);
    }
  }

  // Add a function to handle menu toggle
  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    // When component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // When component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chatLog, chatHistories]);
  async function handleBeforeUnload(e) {
    if (chatLog.length > 0) {
      // Similar checks as your clearChat function
      const isDuplicate = chatHistories.some(
        (history) => JSON.stringify(history.chatLog) === JSON.stringify(chatLog)
      );

      if (!isDuplicate) {
        // Store the chat in Firebase
        const chatCollection = collection(db, "users", user.uid, "chats");
        await addDoc(chatCollection, {
          chatLog: chatLog,
          date: Timestamp.now(),
        });

        // Note: You don't need to update the state here since the user is leaving the page.
      }
    }

    // This message is usually not shown to the user in modern browsers, but the event needs it.
    e.preventDefault();
    e.returnValue = "Are you sure you want to leave?";
  }

  return (
    <div className="dashboard">
      <div className="main">
        <MenuPopupState
          setUserEmail={setUserEmail}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Fire user={user} />
      <div className="junggpt">
        <Dialog
          sx={{
            backgroundColor: "#1e4a66a3",
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogContent
            sx={{
              backgroundColor: "whitesmoke",
              border: "4px solid gray",
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
            }}
          >
            <Typography
              sx={{
                padding: ".8rem",
                fontSize: "22px",
                fontFamily: "'Roboto Slab', serif",
                textAlign: "center",
                borderBottom: "1px solid silver",
                marginBottom: "1.5rem",
              }}
            >
              Begin by letting JungGPT know how you're feeling before you start
              chatting for a more personalized conversation!
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                overflowX: "hidden",
                paddingLeft: "2rem",
              }}
            >
              {[
                "happy 😃",
                "excited 🤩",
                "sad 😢",
                "angry 😠",
                "disgusted 🤢",
                "shameful 😳",
                "surprised 😲",
                "jealous 😒",
                "nervous 😬",
                "anxious 😰",
                "reminiscent 🤔",
                "anticipatory 🤗",
                "embarrassed 😳",
                "determined 😠",
                "unsure",
              ].map((emotion) => (
                <Grid
                  item
                  xs={isMobile ? 5 : 4}
                  key={emotion}
                  sx={{
                    overflowX: "hidden",
                  }}
                >
                  <Button
                    sx={{
                      width: isMobile ? "93%" : "100%",
                      fontFamily: "'Roboto Slab', serif",
                      border: "solid 1px pink",
                      "&:hover": {
                        borderColor: "purple", // Change the border color on hover
                      },
                      variant: selectedEmotions.includes(emotion)
                        ? "contained"
                        : "outlined",
                      ...(selectedEmotions.includes(emotion) && {
                        color: "white", // Change the text color when selected
                      }),
                    }}
                    variant={
                      selectedEmotions.includes(emotion)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleEmotionClick(emotion)}
                  >
                    {emotion}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Button
              sx={{
                marginTop: "2rem",
                backgroundColor: "#607E92",
                border: "1px solid pink",
                color: "whitesmoke",
                width: "50%",
                alignContent: "center",
                alignSelf: "center",
              }}
              variant="contained"
              onClick={() => {
                setOpen(false);
                setInterestsOpen(true);
              }}
            >
              Next
            </Button>
          </DialogContent>
        </Dialog>

        {/* Metaphor Feature************************ */}

        <Dialog
          sx={{ backgroundColor: "#1e4a66a3" }}
          open={interestsOpen}
          onClose={() => setInterestsOpen(false)}
        >
          <DialogContent
            sx={{
              backgroundColor: "whitesmoke",
              border: "4px solid gray",
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
            }}
          >
            <Typography
              sx={{
                padding: ".8rem",
                fontSize: "17px",
                fontFamily: "'Roboto Slab', serif",
                textAlign: "left",
                borderBottom: "1px solid silver",
                marginBottom: "1.5rem",
              }}
            >
              JungGPT has been trained to use metaphor in a strategic,
              personalized way to help users further understand emotions and
              circumstance.
              <br />
              <br />
              The purpose of using metaphor in this way is to aid users in
              understanding emotions and situations that might be complex or
              abstract.
              <br />
              <br />
              What are some of your interests to help JungGPT "speak your
              language"?
            </Typography>

            <TextField
              label="Type your interests"
              variant="outlined"
              value={typedInterest}
              onChange={(e) => setTypedInterest(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />

            <Grid
              sx={{
                marginLeft: isMobile ? "1rem" : "",
              }}
              container
              spacing={2}
            >
              {[
                "Music 🎵",
                "Sports ⚽",
                "Art 🎨",
                "Tech 💻",
                "Film 🎥",
                "Videogames 🎮",
                "Psychology 🔮",
                "Counseling 🫂 ",
                "Astrology 🌠",
                "Science 🔬",
                "Superheroes 💥",
                "Animals 🐶", // ... other interests
              ].map((interest) => (
                <Grid item xs={isMobile ? 5 : 4} key={interest}>
                  <Button
                    sx={{
                      fontFamily: "'Roboto Slab', serif",
                      border: "solid 1px pink",
                      "&:hover": { borderColor: "purple" },
                      variant: selectedInterests.includes(interest)
                        ? "contained"
                        : "outlined",
                      ...(selectedInterests.includes(interest) && {
                        color: "white",
                      }),
                    }}
                    variant={
                      selectedInterests.includes(interest)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleInterestClick(interest)}
                  >
                    {interest}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Button
              sx={{
                marginTop: "2rem",
                backgroundColor: "#607E92",
                border: "1px solid pink",
                color: "whitesmoke",
                width: "50%",
                alignContent: "center",
                alignSelf: "center",
              }}
              variant="contained"
              onClick={() => {
                setInterestsOpen(false);
              }}
            >
              Start Chat
            </Button>
          </DialogContent>
        </Dialog>
        {/* ************************** */}
        <Dialog
          open={showDeveloperNotes}
          onClose={() => setShowDeveloperNotes(false)}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontFamily: "'Roboto Slab', serif",
              backgroundColor: "#A7AEBC",
              color: "white",
            }}
          >
            A message from the developers
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: "#607E92",
              color: "white",
            }}
          >
            <DialogContentText>
              <List>
                <Typography
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "pink",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  We want to thank ALL OF YOU for taking the time to use this
                  tool, it means the world that people are positively responding
                  to this effort and we hope you will subscribe!{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "pink",
                  }}
                >
                  <b
                    style={{
                      color: "white",
                    }}
                  >
                    <br />
                    We are a small team of 4 people
                  </b>{" "}
                  and we feel so grateful for the fact that we have been able to
                  have this big of an impact this quickly after launch - It is
                  really exciting!
                  <br />
                  <br /> That being said...{" "}
                  <b
                    style={{
                      color: "white",
                    }}
                  >
                    This is very expensive to run, this is just the reality of
                    the situation.
                  </b>{" "}
                  While we wish we could give this tool away for free, we
                  currently don't have the backed funding to do so. <br />{" "}
                  <br />
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "whitesmoke",
                    fontSize: "18px",
                  }}
                >
                  Right now, people all over the globe are getting help with
                  JungGPT. If you find this tool helpful - Consider subscribing!
                  <br /> <br />{" "}
                  <b
                    style={{
                      color: "pink",
                    }}
                  >
                    Its only 7 dollars a month!{" "}
                    <span
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      + monthly usage fees
                    </span>
                  </b>
                </Typography>
                <br />

                <Typography
                  sx={{
                    fontSize: "22px",
                    fontFamily: "'Roboto Slab', serif",
                    color: "white",
                  }}
                >
                  What do I gain from subscribing?
                </Typography>
                <br />

                <Typography
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "pink",
                  }}
                >
                  {" "}
                  - Unlimited 24/7 access to JungGPT <br /> - Access to
                  JungSMART and all current and future models
                  <br /> - 1000 character context length per message
                </Typography>
                <DialogTitle
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "white",
                  }}
                >
                  Weekly Developer Notes - 9/5/23
                </DialogTitle>
                <ListItem
                  sx={{
                    color: "pink",
                    borderRadius: "30px",
                    padding: "1rem",
                  }}
                >
                  - Currently, leading with basic statements like "I feel
                  anxious" sometimes causes JungGPT to act counterintuitively.
                  To avoid this behavior, simply type "Can we talk about the
                  anxiety I'm feeling?" or something of the like.
                  <br />
                </ListItem>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: " column",
                    color: "pink",
                  }}
                >
                  <b
                    style={{
                      color: "whitesmoke",
                      fontSize: "22px",
                      textAlign: "left",
                      textDecoration: "underline",
                    }}
                  >
                    Added Features - 9/5/23
                  </b>
                  <br />
                  <b
                    style={{
                      color: "whitesmoke",
                      fontSize: "19px",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    SAPP:{" "}
                  </b>
                  SAPP, our proprietary technology developed by Ventura UX, goes
                  beyond traditional chatbots. With advanced natural language
                  processing, SAPP senses the conversation's emotion and
                  responds accordingly. It's like giving real-time 'thoughts' to
                  the chatbot, tailored by consulting a psychologist. Get
                  genuine assistance with SAPP.
                  <br />
                  <br />
                  <b
                    style={{
                      color: "whitesmoke",
                      fontSize: "19px",
                      textAlign: "left",
                    }}
                  >
                    Saving and continuing previous conversations for Premium
                    Users
                  </b>
                  <br />
                  You can now view and continue your past 9 conversations on
                  Premium. Please be advised, tokenage compounds. Continuing old
                  conversations for too long will cause the bot to hallucinate,
                  lose effectiveness and cause your monthly bill to heavily
                  increase. We advise using your past chats as reference, and to
                  not continue them past 60 messages.
                </ListItem>
                <ListItem
                  sx={{
                    fontFamily: "'Roboto Slab', serif",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  please email support@ventura-ux.com for any issues
                </ListItem>
                {/* Add more notes here */}
              </List>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "brown",
                backgroundColor: "#A7D2B7",
              }}
              onClick={() => setShowDeveloperNotes(false)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {user ? (
          <div className="header">
            <aside
              className={`sidemenu ${isMenuOpen ? "open" : ""}`}
              onClick={handleMenuToggle}
            >
              {isMenuOpen && (
                <>
                  <div
                    className={
                      "side-menu-button" +
                      (subscriptionStatus !== "active" ? " disabled" : "")
                    }
                    // Only allow clicking "New Chat" if subscriptionStatus is "active" and chatLog has content
                    onClick={
                      subscriptionStatus === "active" && chatLog.length > 0
                        ? clearChat
                        : null
                    }
                  >
                    <i className="fas fa-plus"></i>New Chat
                  </div>

                  {/* Only render chat histories for "active" subscribers */}
                  {subscriptionStatus === "active" &&
                    chatHistories.slice(-9).map((chat) => (
                      <div
                        key={chat.id}
                        className="side-menu-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatLog(chat.chatLog);
                        }}
                        style={{
                          marginTop: ".5rem",
                        }}
                      >
                        Chat from{" "}
                        {chat.date && typeof chat.date.toDate === "function"
                          ? `${chat.date
                              .toDate()
                              .toLocaleDateString()} at ${chat.date
                              .toDate()
                              .toLocaleTimeString()}`
                          : "Unknown Date"}
                      </div>
                    ))}
                </>
              )}
            </aside>
            <section className="chatbox">
              <div className="chat-log">
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
              <div className="chat-input-holder">
                <div
                  style={{ width: isMenuOpen ? "35vw" : "54vw" }}
                  className="form-container"
                >
                  <form onSubmit={handleSubmit}>
                    <div>
                      <textarea
                        className="chat-input-textarea"
                        placeholder="Send a message..."
                        rows="1"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          autosize(e.target);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        disabled={trialLimitReached}
                        maxLength={subscriptionStatus === "active" ? 600 : 300}
                      ></textarea>
                      <div className="character-counter">
                        {subscriptionStatus === "active"
                          ? 600 - input.length
                          : 300 - input.length}{" "}
                        characters left
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="send-button"
                      disabled={trialLimitReached}
                    >
                      &#10148;
                    </button>
                  </form>
                </div>
                <div style={{}}>
                  {timer > 0 && (
                    <span>
                      You can send the next message in {timer} seconds
                    </span>
                  )}
                </div>
                <div
                  style={{
                    paddingTop: "2rem",
                    fontFamily: "League Spartan",
                  }}
                  className="chat-disclaimer"
                >
                  JungGPT may produce inaccurate information about people,
                  places, or facts.
                </div>
                <p
                  style={{
                    display: "flex",
                    fontFamily: "League Spartan",
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                  className="chat-disclaimer"
                >
                  * Tokenage compounds. Continuing old conversations for too
                  long can heavily increase your monthly bill, as well as cause
                  the bot to hallucinate.
                  <br />
                  We recommend using your past conversations as reference.
                </p>
              </div>

              <Dialog open={warningPopup} onClose={handleWarningClose}>
                <DialogTitle
                  sx={{
                    textAlign: "center",
                    fontSize: "40px",
                  }}
                >
                  Sorry to interrupt!
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    sx={{
                      textAlign: "center",
                      fontSize: "25px",
                    }}
                  >
                    Your freemium conversation has almost run out! If you're in
                    the middle of a conversation, feel free to wrap it up!
                    <br />
                    <b>You have three messages left!</b>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleWarningClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </section>
            {trialLimitReached && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="overlay"
              >
                <Typography
                  style={{
                    margin: "1rem",
                  }}
                  variant="h6"
                >
                  We know how annoying it is to be stopped mid-conversation...
                  <br />
                  but we can't continue to run this app without your help.
                  <br />
                  <br /> As much as we wish we could keep this app running for
                  free, we can't! <br /> Right now, you're on the free trial.
                  <br />
                  <br />
                  Won't you consider Subscribing?
                </Typography>

                <Button
                  style={{
                    margin: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleUpgrade}
                >
                  Subscribe
                </Button>
                <Button
                  style={{
                    margin: "1rem",
                  }}
                  variant="outlined"
                  onClick={backButton}
                >
                  Back to Selection
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

// Chat HTML
const ChatMessage = ({ message }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: isMobile ? "90%" : "100%",
        alignItems: "center",
        marginLeft: isMobile ? "1rem" : "0rem",
      }}
    >
      <div
        style={{
          display: isMobile ? "flex" : "none",
          marginRight: isMobile ? "1rem" : "0rem",
          width: isMobile ? "2.3rem" : "0rem",
          height: isMobile ? "2.3rem" : "0rem",
        }}
        className={`avatar ${message.role === "assistant" ? "chatgpt" : ""}`}
      ></div>
      <div
        className={`chat-message ${
          message.role === "assistant" ? "chatgpt" : ""
        } ${message.role === "assistant" ? "fade-in" : ""}`}
      >
        <div
          style={{
            display: isMobile ? "none" : "flex",
          }}
          className={`avatar ${message.role === "assistant" ? "chatgpt" : ""}`}
        ></div>
        <div
          className="message"
          style={{
            fontSize: isMobile ? "14px" : "14px",
            paddingTop: isMobile ? "0rem" : "0rem",
            width: "80%",
            color:
              message.role === "user" || "assistant"
                ? isMobile
                  ? "#8B6041"
                  : "#AEC7CC"
                : "inherit",
          }}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};
