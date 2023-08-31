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
  const keywordStems = ["existen", "philos", "lone"];

  const keywordSentiments = {};

  for (const keywordStem of keywordStems) {
    // Find all sentences that include the keyword stem
    const relevantSentences = sentences.filter((sentence) =>
      sentence.includes(keywordStem)
    );

    // Process each sentence to get sentiment
    for (const relevantSentence of relevantSentences) {
      const tokens = tokenizer.tokenize(relevantSentence);
      const stemmedTokens = tokens.map((token) => stemmer.stem(token));

      // Analyze the sentiment of the relevant sentence
      const sentimentScore = analyzer.getSentiment(stemmedTokens);

      // Store the sentiment for this keyword
      keywordSentiments[keywordStem] = sentimentScore;

      console.log(relevantSentences);
      console.log(stemmedTokens);
      console.log(sentimentScore);
    }
  }
  // Make decisions based on the sentiment scores
  if (keywordSentiments["lone"]) {
    thought =
      keywordSentiments["lone"] <= 0.28
        ? getRandomElement(lonelinessNegativeArray)
        : getRandomElement(lonelinessArray);
  } else if (keywordSentiments["existen"]) {
    thought = getRandomElement(existentialismArray);
  } else if (keywordSentiments["philos"]) {
    thought = getRandomElement(philosophyArray);
  }

  return thought;
}
module.exports = { pickThought };
