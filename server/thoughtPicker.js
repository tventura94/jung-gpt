const nlp = require("compromise");
const {
  existentialismArray,
  philosophyArray,
  loveArray,
  lonelinessArray,
} = require("./thoughts");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickThought(lastUserMessage) {
  let thought = "";

  // Perform NLP on the last user message
  const doc = nlp(lastUserMessage.toLowerCase());

  // Identify keywords and topics
  const topics = doc.topics().out("array");
  console.log(topics);
  if (topics.includes("existentialism") || topics.includes("existential")) {
    thought = getRandomElement(existentialismArray);
  } else if (
    topics.includes("philosophy") ||
    topics.includes("philosophical")
  ) {
    thought = getRandomElement(philosophyArray);
  } else if (topics.includes("love") || topics.includes("romance")) {
    thought = getRandomElement(loveArray);
  } else if (
    topics.includes("lonely") ||
    topics.includes("loneliness") ||
    topics.includes("alone")
  ) {
    thought = getRandomElement(lonelinessArray);
  }

  // Add more conditions as needed

  return thought;
}

module.exports = { pickThought };
