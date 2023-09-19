import React, { useState, useEffect, useRef } from "react";
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
import Stress from "./Stress";
import Dec3 from "/dec3.svg";
import Sub from "/SubAd.svg";
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
  const [jobValue, setJobValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  // Emotion / Interests Select overlay
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [typedInterest, setTypedInterest] = useState("");
  const [interestsData, setInterestsData] = useState(null);
  const [isOldChat, setIsOldChat] = useState(false);
  const backgrounds = [
    "Sleek",
    "Black",
    "Dots",
    "Nightsky",
    "Lavalamp",
    "Cat",
    "FutureCity",
    "CampFire",
  ];
  const sideMenuRef = useRef(null); // Create a reference for the side menu
  useEffect(() => {
    // Define a function to handle document click
    const handleDocumentClick = (event) => {
      // Check if the side menu is open and the clicked element is not within the side menu
      if (
        isMenuOpen &&
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the side menu
      }
    };

    // Attach the event listener
    document.addEventListener("click", handleDocumentClick);

    // Cleanup - remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMenuOpen]);
  function handleUpgrade() {
    setAuthState("upgrade");
  }

  useEffect(() => {
    const checkCollections = async () => {
      const jobCollectionRef = collection(db, "users", user.uid, "job");
      const descriptionCollectionRef = collection(
        db,
        "users",
        user.uid,
        "description"
      );
      const nameCollectionRef = collection(db, "users", user.uid, "name");

      // Fetch the documents from the subcollections
      const jobSnapshot = await getDocs(jobCollectionRef);
      const descriptionSnapshot = await getDocs(descriptionCollectionRef);
      const nameSnapshot = await getDocs(nameCollectionRef);

      // Extract values from the documents
      const jobDoc = jobSnapshot.docs[0];
      if (jobDoc) {
        const jobData = jobDoc.data();
        if (jobData && jobData.value) {
          // Assuming the field name is 'value' inside the job document
          setJobValue(jobData.value);
        }
      }

      const descriptionDoc = descriptionSnapshot.docs[0];
      if (descriptionDoc) {
        const descriptionData = descriptionDoc.data();
        if (descriptionData && descriptionData.value) {
          // Assuming the field name is 'value' inside the description document
          setDescriptionValue(descriptionData.value);
        }
      }

      const nameDoc = nameSnapshot.docs[0];
      if (nameDoc) {
        const nameData = nameDoc.data();
        if (nameData && nameData.value) {
          // Assuming the field name is 'value' inside the name document
          setNameValue(nameData.value);
        }
      }
    };

    checkCollections();
  }, [user.uid]);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotions((prev) => {
      if (prev.includes(emotion)) {
        return prev.filter((e) => e !== emotion);
      } else {
        return [...prev, emotion];
      }
    });
  };
  const [background, setBackground] = useState("defaultBackground");
  useEffect(() => {
    const savedBackground = localStorage.getItem("userBackgroundChoice");
    if (savedBackground) {
      setBackground(savedBackground);
    }
  }, []);
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

  async function decryptText(cipherText, blackAlpaca) {
    const textDecoder = new TextDecoder();
    const passwordBuffer = new TextEncoder().encode(blackAlpaca);
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
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: passwordBuffer,
      },
      key,
      cipherText
    );
    return textDecoder.decode(new Uint8Array(decrypted));
  }

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

  // Subscription pay wall logic - if the user isnt subscribed they get 16 messages total, and a warning popup at 12 messages.
  useEffect(() => {
    if (subscriptionStatus !== "active") {
      if (chatLog.length >= 15) {
        setTrialLimitReached(true);
      } else if (chatLog.length === 11) {
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

  // HANDLE SUBMIT MESSAGE
  // ///////////////////////////////////////////////
  // //////////////////////////////////////////////

  async function handleSubmit(e) {
    e.preventDefault();

    if (containsBannedKeywords(input)) {
      setShowBannedModal(true);
      return;
    }

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

    // Fetch to backend   LIVE  https://jung-gpt.onrender.com/jung   DEV http://localhost:3080/jung"
    const response = await fetch("https://jung-gpt.onrender.com/jung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobValue: jobValue, // <-- Adjusted this
        descriptionValue: descriptionValue, // <-- And this
        nameValue: nameValue, // <-- And this
        conversation: chatLogNew,
        emotions: selectedEmotions,
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

    const blackAlpaca = "x1!,54372usjw!"; // Your encryption key
    const allChats = await Promise.all(
      chatSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const encryptedChatLogArray = new Uint8Array(
          [...atob(data.chatLog)].map((char) => char.charCodeAt(0))
        );
        const decryptedChatLog = await decryptText(
          encryptedChatLogArray,
          blackAlpaca
        );

        return {
          id: doc.id,
          chatLog: JSON.parse(decryptedChatLog),
          date: data.date,
        };
      })
    );

    setChatHistories(allChats);
  }

  useEffect(() => {
    fetchChatHistories();
  }, []); // Empty

  const blackAlpaca = "x1!,54372usjw!"; // Your encryption key

  async function saveEncryptedChatToFirebase() {
    if (chatLog.length > 0) {
      const encryptedChatLog = await encryptText(
        JSON.stringify(chatLog),
        blackAlpaca
      );
      const encryptedChatLogBase64 = btoa(
        String.fromCharCode(...encryptedChatLog)
      );

      // Check if chatLog is already in chatHistories
      const isDuplicate = chatHistories.some(
        (history) => JSON.stringify(history.chatLog) === JSON.stringify(chatLog)
      );

      if (!isDuplicate) {
        // Store the encrypted chat in Firebase with current date
        const chatCollection = collection(db, "users", user.uid, "chats");
        const docRef = await addDoc(chatCollection, {
          chatLog: encryptedChatLogBase64,
          date: Timestamp.now(),
        });

        // Update chatHistories state to include the new chat
        const newChat = {
          id: docRef.id,
          chatLog: chatLog,
          date: Timestamp.now(),
        };
        setChatHistories((prevChats) => [...prevChats, newChat]);
      }
    }
  }

  async function clearChat(e) {
    e.stopPropagation();

    await saveEncryptedChatToFirebase();

    // Clear current chat
    setChatLog([]);
    setTrialLimitReached(false);
  }

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  const bannedKeywords = [
    "suicide",
    "self-harm",
    "selfharm",
    "kill others",
    "cut myself",
    "cutting myself",
    "I'm cutting",
    "im cutting",
    "im cuting",
    "im cuttin",
    "I'm cuttin",
    "burn myself",
    "burning myself",
    "murder",
    "murder others",
    "suicid",
    "unalive",
    "un-alive",
    "unalivv",
    "unalivvve",
    "unalived",
    "suicided",
    "end my life",
    "ending my life",
    "take my own life",
    "kill myself",
    "hurt myself",
    "self inflicted",
    "overdose",
    "want to die",
    "don't want to live",
    "suicidio", // Spanish
    "selbstmord", // German
    "samobójstwo", // Polish
    "自杀", // Mandarin
    "自殺", // Japanese
    "자살", // Korean
    "suicídio", // Portuguese
    "התאבדות", // Hebrew
    "suicidio", // Italian
    "αυτοκτονία", // Greek
    "суицид", // Russian
    "sebevražda", // Czech
    "selvmord", // Norwegian
    "hunanol", // Welsh
    // Note: Cantonese uses the same written form as Mandarin for "suicide", which is "自杀".
  ];
  const [showBannedModal, setShowBannedModal] = useState(false);

  function containsBannedKeywords(text) {
    for (let keyword of bannedKeywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
    return false;
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
                fontFamily: "'League Spartan', serif",
                textAlign: "center",
                borderBottom: "1px solid silver",
                marginBottom: "1.5rem",
              }}
            >
              Begin by letting JungGPT know how you're feeling!
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
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10em",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: 600,
                      padding: "1em 2em",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      border: "1px solid black",
                      boxShadow: "0 0 0 0 black",
                      "&:hover": {
                        transform: "translateY(-4px) translateX(-2px)",
                        boxShadow: "2px 5px 0 0 black",
                      },
                      "&:active": {
                        transform: "translateY(2px) translateX(1px)",
                        boxShadow: "0 0 0 0 black",
                        color: "#607E92",
                      },
                      fontFamily: "League Spartan, serif",
                      width: isMobile ? "93%" : "100%",
                      variant: selectedEmotions.includes(emotion)
                        ? "contained"
                        : "outlined",
                      ...(selectedEmotions.includes(emotion) && {
                        color: "#3B83B4", // Change the text color when selected
                      }),
                    }}
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
                backgroundColor: "#3B83B4",
                border: "1px solid pink",
                color: "whitesmoke",
                width: "50%",
                alignContent: "center",
                alignSelf: "center",
                // The button styles:
                backgroundColor: "white",
                color: "black",
                borderRadius: "10em",
                fontSize: isMobile ? "13px" : "15px",
                fontWeight: 600,

                fontFamily: "League Spartan",
                padding: "1em",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                border: "1px solid black",
                boxShadow: "0 0 0 0 black",
                "&:hover": {
                  transform: "translateY(-4px) translateX(-2px)",
                  boxShadow: "2px 5px 0 0 black",
                  backgroundColor: "#607E92",
                  color: "whitesmoke",
                },
                "&:active": {
                  transform: "translateY(2px) translateX(1px)",
                  boxShadow: "0 0 0 0 black",
                },
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

        {/* ************************** */}
        <Dialog
          open={showDeveloperNotes}
          onClose={() => setShowDeveloperNotes(false)}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            margin: "0 auto",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src={Sub}
          ></img>
          <DialogActions
            sx={{
              backgroundColor: "#607E92",
            }}
          >
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10em",
                fontSize: isMobile ? "10px" : "12px",
                fontWeight: 600,
                padding: "1em 2em",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                border: "1px solid whitesmoke",
                boxShadow: "0 0 0 0 whitesmoke",
                "&:hover": {
                  transform: "translateY(-4px) translateX(-2px)",
                  boxShadow: "2px 5px 0 0 whitesmoke",
                  color: "rgb(255, 222, 89)",
                  border: "1px solid whitesmoke",
                },
                "&:active": {
                  transform: "translateY(2px) translateX(1px)",
                  boxShadow: "0 0 0 0 whitesmoke",
                  color: "#607E92",
                },
                fontFamily: "League Spartan, serif",
                width: isMobile ? "50%" : "25%",
              }}
              onClick={handleUpgrade}
            >
              UPGRADE NOW
            </Button>
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10em",
                fontSize: isMobile ? "10px" : "12px",
                fontWeight: 600,
                padding: "1em 2em",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                border: "1px solid whitesmoke",
                boxShadow: "0 0 0 0 whitesmoke",
                "&:hover": {
                  transform: "translateY(-4px) translateX(-2px)",
                  boxShadow: "2px 5px 0 0 whitesmoke",
                  color: "rgb(255, 222, 89)",
                  border: "1px solid whitesmoke",
                },
                "&:active": {
                  transform: "translateY(2px) translateX(1px)",
                  boxShadow: "0 0 0 0 whitesmoke",
                  color: "#607E92",
                },
                fontFamily: "League Spartan, serif",
                width: isMobile ? "50%" : "25%",
              }}
              onClick={() => setShowDeveloperNotes(false)}
            >
              GOT IT
            </Button>
          </DialogActions>
        </Dialog>
        {user ? (
          <div className={`header ${background}`}>
            <aside
              ref={sideMenuRef} // Attach the reference to the side menu
              className={`sidemenu ${isMenuOpen ? "open" : ""}`}
              onClick={handleMenuToggle}
            >
              {isMenuOpen && (
                <>
                  <div
                    className={
                      "side-menu-button" +
                      (subscriptionStatus !== "active" ? "disabled" : "")
                    }
                    onClick={
                      subscriptionStatus === "active" && chatLog.length > 0
                        ? clearChat
                        : null
                    }
                  >
                    <img
                      style={{
                        width: "100%",
                      }}
                      src={ButtonCanva}
                    ></img>
                  </div>

                  {/* Background selector */}
                  <div
                    className="background-selector"
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginLeft: isMobile ? "2.3rem" : "1.6rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <select
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "10em",
                        fontSize: isMobile ? "16px" : "16px",
                        fontWeight: 500,
                        padding: ".5em ",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        border: "1px solid whitesmoke",
                        boxShadow: "0 0 0 0 whitesmoke",
                        fontFamily: "League Spartan, serif",
                      }}
                      value={background}
                      onChange={(e) => {
                        setBackground(e.target.value);
                        localStorage.setItem(
                          "userBackgroundChoice",
                          e.target.value
                        );
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevents the side menu from closing
                    >
                      {backgrounds.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                    <button
                      style={{
                        marginLeft: isMobile ? "1rem" : "2.0rem",
                        fontSize: isMobile ? "33px" : "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        border: "none",
                        color:
                          background === "Sleek"
                            ? "whitesmoke"
                            : background === "Nightsky"
                            ? "#D791C7"
                            : background === "Dots"
                            ? "whitesmoke"
                            : background === "Lavalamp"
                            ? "#447ef2"
                            : background === "CampFire"
                            ? "#a07493"
                            : background === "Black"
                            ? "silver"
                            : background === "FutureCity"
                            ? "#FFD1A3"
                            : "",
                      }}
                      onClick={handleMenuToggle}
                    >
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>

                  {/* Only render chat histories for "active" subscribers */}
                  {subscriptionStatus === "active" &&
                    chatHistories.slice(-9).map((chat) => (
                      <div
                        key={chat.id}
                        className={`side-menu-button2 ${
                          background === "Nightsky"
                            ? "nightsky-border"
                            : background === "FutureCity"
                            ? "futurecity-border"
                            : background === "Black"
                            ? "black-border"
                            : background === "Sleek"
                            ? "sleek-border"
                            : background === "Dots"
                            ? "dots-border"
                            : background === "Lavalamp"
                            ? "lavalamp-border"
                            : background === "Cat"
                            ? "cat-border"
                            : background === "CampFire"
                            ? "campfire-border"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatLog(chat.chatLog);
                        }}
                        style={{
                          marginTop: ".5rem",
                          letterSpacing: "1px",
                          fontFamily: "League Spartan",
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
              {/* <Stress /> */}
              <div className="chat-log">
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
              <div className="chat-input-holder">
                <div style={{ width: "60%" }} className="form-container">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <BannedWordsModal
                        show={showBannedModal}
                        onClose={() => setShowBannedModal(false)}
                      />
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
                      className={`send-button ${
                        background === "Sleek"
                          ? "button-sleek"
                          : background === "Dots"
                          ? "button-dots"
                          : background === "Nightsky"
                          ? "button-nightsky"
                          : background === "Lavalamp"
                          ? "button-lavalamp"
                          : background === "Cat"
                          ? "button-cat"
                          : background === "FutureCity"
                          ? "button-futurecity"
                          : background === "CampFire"
                          ? "button-campfire"
                          : background === "Black"
                          ? "button-black"
                          : ""
                      }`}
                      disabled={trialLimitReached}
                      onChange={(e) => {
                        if (containsBannedKeywords(e.target.value)) {
                          alert("Sorry, we cannot talk about that topic."); // This uses the browser's built-in alert, but you could use a more user-friendly modal/popup.
                          return; // Don't set the input if it contains banned words
                        }
                        setInput(e.target.value);
                        autosize(e.target);
                      }}
                    >
                      &#10148;
                    </button>
                  </form>
                </div>
                <div
                  style={{
                    color:
                      background === "Nightsky"
                        ? "#363d46"
                        : background === "FutureCity"
                        ? "whitesmoke"
                        : "",
                  }}
                >
                  {timer > 0 && (
                    <span>
                      You can send the next message in {timer} seconds
                    </span>
                  )}
                </div>
                <div
                  style={{
                    paddingTop: "0rem",
                    fontFamily: "League Spartan",
                    color:
                      background === "Nightsky"
                        ? "#363d46"
                        : background === "FutureCity"
                        ? "white"
                        : "",
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
                    color:
                      background === "Nightsky"
                        ? "#363d46"
                        : background === "FutureCity"
                        ? "white"
                        : "",
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
            fontSize: isMobile ? "15px" : "18px",
            paddingTop: isMobile ? "0rem" : "0rem",
            width: "80%",
            color:
              message.role === "user" || "assistant"
                ? isMobile
                  ? "#8B6041"
                  : "#AEC7CC"
                : "inherit",
            fontFamily: "League Spartan",
          }}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};
