const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
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

  // Perform tokenization on the last user message
  const tokens = tokenizer.tokenize(lastUserMessage.toLowerCase());
  console.log(tokens);
  // Define the keywords
  const keywords = [
    "existentialism",
    "existential",
    "philosophy",
    "philosophical",
    "love",
    "romance",
    "lonely",
    "loneliness",
    "alone",
  ];
  for (const keyword of keywords) {
    if (tokens.includes(keyword)) {
      switch (keyword) {
        case "existentialism":
        case "existential":
          thought = getRandomElement(existentialismArray);
          break;
        case "philosophy":
        case "philosophical":
          thought = getRandomElement(philosophyArray);
          break;
        case "love":
        case "romance":
          thought = getRandomElement(loveArray);
          break;
        case "lonely":
        case "loneliness":
        case "alone":
          thought = getRandomElement(lonelinessArray);
          break;
      }

      if (thought) break; // Exit the loop if a thought has been picked
    }
  }

  return thought;
}

module.exports = { pickThought };
