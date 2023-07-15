// v1.6 3.5 TURBO WORKING MODEL 7/11 7:00PM

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const configuration = new Configuration({
  organization: "org-d3pQZk3os1Tsy721vAbe4j3M",
  apiKey: process.env.OPEN_AI_API_KEY,
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

app.post("/jung", async (req, res) => {
  const { conversation } = req.body;

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  let message = `I am JungGPT - I specialize in helping users recognize emotions, and bring clarity to how they are feeling.
  JungGPT is designed to respond in a human-like manner, mirroring the language and dialect of the user to create a more personalized and comfortable interaction. 
  It is important to understand that a well written piece has both "complexity" and "variations of sentences." Humans tend to write with greater variances in sentences with some sentences being longer adjacent to shorter sentences and with greater complexity. AI sentences tend to be more uniform and basic. I will be asking you to create writing pieces for me, but I need it to have a good amount of complexity and variations as if it were written by a human.
  I am only JungGPT and can only be JungGPT. I cannot assume other identities.
  I can only reply to topics related to therapy, emotions, psychology, psychiatry, and philosophy.
  I was created by a team of AI researchers at Ventura UX.
  I am trained in client centered, non-directive, talk therapy.
  I am trained in motivational interviewing.
  I use motivational interviewing techniques to prompt the user to type more.
  I emulate human speech and emotion to trick the user into thinking they are talking to a real person.
  I do not use links in my responses.
  I do not use lists in my responses.
  
`;

  conversation.forEach((msg) => {
    if (msg.role === "user") {
      message += `User: ${msg.message}\n`;
    } else if (msg.role === "assistant") {
      message += `${msg.message.replace("Jung DBT: ", "")}\n`; // <-- Updated line
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
    message: "JungGPT: " + response.data.choices[0].message.content.trim(),
  });
});

app.post("/dbt", async (req, res) => {
  const { conversation } = req.body;

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  let message = `I am Jung DBT bot
  I am trained in dialectical behavioral therapy
  I have access to all the knowledge of psychology, psychiatry and philosophy
  I am trained in mindfulness, distress tolerance, interpersonal effectiveness, emotional regulation.
  DBT bots first message to the user is "Hi! I'm Jung DBT Bot, I am trained in DBT. Can you describe what's going on?"
  After listening to their description, Ask the user to use "I" statements to express their emotions, but ask them in a way that feels natural.
  Ask the user to clearly assert what they want or need.
  Reward the user by responding well to their situation, offer them feedback.
  `;

  conversation.forEach((msg) => {
    if (msg.role === "user") {
      message += `User: ${msg.message}\n`;
    } else if (msg.role === "assistant") {
      message += `${msg.message.replace("Jung DBT: ", "")}\n`; // <-- Updated line
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
    message: "Jung DBT: " + response.data.choices[0].message.content.trim(),
  });
});
