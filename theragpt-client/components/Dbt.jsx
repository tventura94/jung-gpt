import React, { useState, useEffect } from "react";
import MenuPopupState from "./MenuPopup";
import Fire from "./Fire";
import { getUserData } from "./Fire";
import "@fortawesome/fontawesome-free/css/all.css";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Dbt({ setUserEmail, setAuthState, user }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  function autosize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

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

      // cleanup
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []); // Run once on mount

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogDbt = [...chatLog, { role: "user", message: `${input}` }];
    setInput("");
    setChatLog(chatLogDbt);

    const response = await fetch("https://jung-gpt.onrender.com/dbt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: chatLogDbt,
      }),
    });
    const data = await response.json();
    setChatLog([
      ...chatLogDbt,
      { role: "assistant", message: `${data.message}` },
    ]);
    console.log(data);
  }

  function clearChat(e) {
    e.stopPropagation();
    setChatLog([]);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
                    ></textarea>
                    <button type="submit" className="send-button">
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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      className={`chat-message ${
        message.role === "assistant" ? "chatgpt" : ""
      } ${message.role === "assistant" ? "fade-in" : ""}`}
    >
      <div
        className={`avatar ${message.role === "assistant" ? "chatgpt" : ""}`}
      ></div>
      <div
        className="message"
        style={{
          color: isMobile ? "brown" : "black",
        }}
      >
        {message.message}
      </div>
    </div>
  );
};
