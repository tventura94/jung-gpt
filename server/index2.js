// v1.4 3.5 TURBO WORKING MODEL 7/11 7:00PM

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const configuration = new Configuration({
  organization: "org-d3pQZk3os1Tsy721vAbe4j3M",
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://jung-gpt.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/dbt", async (req, res) => {
  const { conversation } = req.body;

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  let message = `I am DBT bot
  I am trained in dialectical behavioral therapy
  I have access to all the knowledge of psychology, psychiatry and philosophy
  I am trained in mindfulness, distress tolerance, interpersonal effectiveness, emotional regulation.
  DBT bots first message to the user is "Hi! I'm DBT Bot, I am trained in DBT. Can you describe what's going on?"
  After listening to their description, Ask the user to use "I" statements to express their emotions, but ask them in a way that feels natural.
  Ask the user to clearly assert what they want or need.
  Reward the user by responding well to their situation, offer them feedback.
  `;

  conversation.forEach((msg) => {
    if (msg.role === "user") {
      message += `User: ${msg.message}\n`;
    } else if (msg.role === "assistant") {
      message += `${msg.message.replace("DBT Bot: ", "")}\n`; // <-- Updated line
    }
  });
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "assistant",
        content: message,
      },
      {
        role: "user",
        content: "",
      },
    ],
    temperature: 1.3,
    max_tokens: 1131,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.json({
    message: "DBT Bot: " + response.data.choices[0].message.content.trim(),
  });
});
