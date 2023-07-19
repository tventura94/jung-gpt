import React, { useState, useEffect } from "react";
import MenuPopupState from "./MenuPopup";
import Fire from "./Fire";
import { getUserData } from "./Fire";
import "@fortawesome/fontawesome-free/css/all.css";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { db } from "../components/Fire";
import { collection, onSnapshot } from "firebase/firestore";

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
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData(user.email);
      } catch (error) {
        // Handle any potential errors
        console.log("Error retrieving user data:", error);
      }
    };

    fetchData();
  }, [user.email]);

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

  useEffect(() => {
    if (subscriptionStatus !== "active" && chatLog.length >= 9) {
      setTrialLimitReached(true);
    } else {
      setTrialLimitReached(false);
    }
  }, [chatLog, subscriptionStatus]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"), // Updated document reference
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];

        if (newSub) {
          console.log(`Account is ${newSub.status}`);
          setSubscriptionStatus(newSub.status);
        } else {
          console.log("Account not active");
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

  function handleUpgrade() {
    setAuthState("upgrade");
  }

  function backButton() {
    setAuthState("selector");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (trialLimitReached) {
      return;
    }

    let chatLogNew = [...chatLog, { role: "user", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const response = await fetch("https://jung-gpt.onrender.com/jung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: chatLogNew,
      }),
    });

    const data = await response.json();
    setChatLog([
      ...chatLogNew,
      { role: "assistant", message: `${data.message}` },
    ]);
  }

  function clearChat(e) {
    e.stopPropagation();
    setChatLog([]);
    setTrialLimitReached(false);
  }

  // Add a function to handle menu toggle
  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
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
      <div>
        {user ? (
          <div className="header">
            <aside
              className={`sidemenu ${isMenuOpen ? "open" : ""}`}
              onClick={handleMenuToggle}
            >
              {/* Conditionally render the "New Chat" button */}
              {isMenuOpen && (
                <div className="side-menu-button" onClick={clearChat}>
                  <i className="fas fa-plus"></i>New Chat
                </div>
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
                    ></textarea>
                    <button
                      type="submit"
                      className="send-button"
                      disabled={trialLimitReached}
                    >
                      &#10148;
                    </button>
                  </form>
                </div>
                <div className="chat-disclaimer">
                  JungGPT may produce inaccurate information about people,
                  places, or facts.
                </div>
              </div>
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
                  Sorry, you're on the free trial. Upgrade to continue chatting.
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

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message ${
        message.role === "assistant" ? "chatgpt" : ""
      }`}
    >
      <div
        className={`avatar ${message.role === "assistant" ? "chatgpt" : ""}`}
      ></div>
      <div
        className="message"
        style={{
          color: message.role === "user" ? "#AEC7CC" : "inherit",
        }}
      >
        {message.message}
      </div>
    </div>
  );
};
