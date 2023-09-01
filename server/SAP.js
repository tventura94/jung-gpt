///////////////////////////////////////////////
// SENTIMENT ADAPTIVE PREPROCESSOR ///////////
/////////////////////////////////////////////

const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  keyFilename: "./nlp.json",
});

const {
  existentialismArray,
  philosophyArray,
  lonelinessArray,
  lonelinessNegativeArray,
} = require("./thoughts"); // Replace with your actual file path

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function SAP(lastUserMessage) {
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

    if (relevantSentence) {
      const document = {
        content: relevantSentence,
        type: "PLAIN_TEXT",
      };

      // Use Google's Natural Language API to analyze the sentiment
      const [result] = await client.analyzeSentiment({ document: document });
      const sentimentScore = result.documentSentiment.score;

      console.log(`Sentence: ${relevantSentence}`);
      console.log(`Sentiment Score: ${sentimentScore}`);

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

module.exports = { SAP };
