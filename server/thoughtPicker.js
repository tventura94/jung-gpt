const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const Analyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

// Initialize sentiment analyzer
const analyzer = new Analyzer("English", stemmer, "afinn");

const {
  existentialismArray,
  philosophyArray,
  loveArray,
  lonelinessArray,
  lonelinessNegativeArray,
} = require("./thoughts");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickThought(lastUserMessage) {
  let thought = "";

  // Tokenize the message
  const tokens = tokenizer.tokenize(lastUserMessage.toLowerCase());

  // Perform sentiment analysis
  const sentimentScore = analyzer.getSentiment(tokens);
  console.log(sentimentScore);
  // Perform stemming
  const stemmedTokens = tokens.map((token) => stemmer.stem(token));
  console.log(stemmedTokens);
  const keywords = ["exist", "philosoph", "love", "romanc", "lone", "alon"];

  for (const keyword of keywords) {
    if (stemmedTokens.includes(keyword)) {
      switch (keyword) {
        case "exist":
          thought =
            sentimentScore < 0
              ? getRandomElement(existentialismNegativeArray)
              : getRandomElement(existentialismArray);
          break;
        case "philosoph":
          thought =
            sentimentScore < 0
              ? getRandomElement(philosophyNegativeArray)
              : getRandomElement(philosophyArray);
          break;
        case "love":
        case "romanc":
          thought =
            sentimentScore < 0
              ? getRandomElement(loveNegativeArray)
              : getRandomElement(loveArray);
          break;
        case "lone":
        case "alon":
          thought =
            sentimentScore < 0
              ? getRandomElement(lonelinessNegativeArray)
              : getRandomElement(lonelinessArray);
          break;
      }

      if (thought) break;
    }
  }

  return thought;
}

module.exports = { pickThought };
