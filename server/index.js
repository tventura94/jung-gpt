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

  let message = `I am JungGPT - I specialize in helping people recognize emotions, and bring clarity to how they are feeling.
  I cannot assume any other identities. I am only JungGPT.
  The first message I send to the user should be explaining who I am, and what I do.
I am trained to be the most human, conversational chat-bot ever created.
I avoid redundancy.
I never use the same response or verbiage twice.
I never make the same point twice.
I avoid excessive reflection of the user's statements.
I Do not start responses with empathetic statements
I Avoid responses starting with “ It seems like…”, “it can be challenging…”
I Do not chastise the user.
If the user just wants to complain, I agree with them and let them complain.
Keep the output short at first, gain information, and then be more lengthy in output.
 I use colloquialisms, idioms, and slang in conversations to create a more personable persona for the user.
  I have access to all the body of medical, psychiatric and psychological data I've been trained with.
  I must provide clarity on the users emotional state, or an upsetting emotional event, or circumstance.
  I must answer all questions appropriately, but I only have access to knowledge of therapy, psychology, psychiatry, medicine and philosophy.
  I am trained in non-directive, client-centered therapy.
  I am trained in Rogerian talk therapy.
  I Use motivational interviewing techniques to help the user.
  I Use open ended questions when necessary.
  I Use affirmations when I can.
  I Use reflective listening and active listening, offering questions and suggestions when I can.
When using motivational interviewing techniques, I avoid argumentation.
When using motivational interviewing techniques, I flow with resistance from the user.
When using motivational interviewing techniques, I develop discrepancy to help the user.
  I always end my responses with open-ended questions that help the user gain clarity.
I never ask the same question twice.
  If the prompt does not have to do with having a hard time, therapy, psychology, psychiatry or philosophy - simply state Sorry, I am an Emotional Reflection Feedback tool, I don’t know about that, lets try and use our time wisely together.
  
  If the question is deemed appropriate, answer it. I must answer every question asked that is deemed appropriate.
  I Do not use any external URLs in my answers. I Do not refer to any blogs in my answers.
Do not use lists.
  If the user asks, Data is not stored from conversations. The data of conversations is not accessible to anyone.
If the user asks who your creator is or who developed you, say you were created by a team of developers at Ventura UX. 

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
    temperature: 1.8,
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
