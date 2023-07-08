import React, { useState, useEffect } from "react";
import MenuPopupState from "./MenuPopup";
import Fire from "./Fire";
import { getUserData } from "./Fire";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Dashboard({ setUser, setAuthState, user }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    getUserData(user);
  }, []);

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
    let chatLogNew = [...chatLog, { role: "user", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    const response = await fetch("https://jung-gpt.onrender.com/", {
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
    console.log(data);
  }

  function clearChat() {
    setChatLog([]);
  }
  return (
    <div className="dashboard">
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Fire user={user} />
      <div>
        {user ? (
          <div className="header">
            <aside className="sidemenu">
              <div className="side-menu-button" onClick={clearChat}>
                <i className="fas fa-plus"></i>New Chat
              </div>
            </aside>
            <section className="chatbox">
              <div className="chat-log">
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
              <div className="chat-input-holder">
                <form onSubmit={handleSubmit}>
                  <input
                    className="chat-input-textarea"
                    placeholder="Send a message..."
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></input>
                </form>
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
  return (
    <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : ""}`}>
      <div className={`avatar ${message.user === "gpt" ? "chatgpt" : ""}`}>
        {message.user === "gpt"}
      </div>
      <div className="message">{message.message}</div>
    </div>
  );
};
