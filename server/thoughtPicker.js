const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const Analyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

// Initialize sentiment analyzer
const analyzer = new Analyzer("English", stemmer, "afinn");

const {
  existentialismArray,
  philosophyArray,
  lonelinessArray,
  lonelinessNegativeArray,
} = require("./thoughts");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickThought(lastUserMessage) {
  let thought = "";

  // Split the message into sentences
  const sentences = lastUserMessage.toLowerCase().split(". ");

  // Initialize keyword stems
  const keywordStems = ["exist", "philosoph", "love", "romanc", "lone", "alon"];

  for (const keywordStem of keywordStems) {
    // Find the first sentence that includes the keyword stem
    const relevantSentence = sentences.find((sentence) =>
      sentence.includes(keywordStem)
    );

    console.log(relevantSentence);

    if (relevantSentence) {
      // Tokenize and stem the relevant sentence
      const tokens = tokenizer.tokenize(relevantSentence);
      const stemmedTokens = tokens.map((token) => stemmer.stem(token));

      // Analyze the sentiment of the relevant sentence
      const sentimentScore = analyzer.getSentiment(stemmedTokens);
      console.log(stemmedTokens);
      console.log(sentimentScore);

      switch (keywordStem) {
        case "exist":
          thought = getRandomElement(existentialismArray);
          break;
        case "philosoph":
          thought = getRandomElement(philosophyArray);
          break;
        case "lone":
        case "alon":
          thought =
            sentimentScore >= 0
              ? getRandomElement(lonelinessArray)
              : getRandomElement(lonelinessNegativeArray);
          break;
      }

      if (thought) break; // Exit the loop if a thought has been picked
    }
  }

  return thought;
}

module.exports = { pickThought };
