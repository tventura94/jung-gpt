///////////////////////////////////////////////
// SENTIMENT ADAPTIVE PREPROCESSOR ///////////
/////////////////////////////////////////////

const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient({
  keyFilename: "./nlp.json",
});

const {
  existentialismArray,
  philosophArray,
  philosophNegativeArray,
  lonelinessArray,
  lonelinessNegativeArray,
  existentialismNegativeArray,
  loveArray,
  loveNegativeArray,
  romanceArray,
  romanceNegativeArray,
  jobArray,
  jobNegativeArray,
  employArray,
  employNegativeArray,
  bossArray,
  bossNegativeArray,
  coworkArray,
  coworkNegativeArray,
  schoolArray,
  schoolNegativeArray,
  collegeArray,
  collegeNegativeArray,
  universArray,
  universNegativeArray,
  highschoolArray,
  highschoolNegativeArray,
  studyArray,
  studyNegativeArray,
  teachArray,
  teachNegativeArray,
  professArray,
  professNegativeArray,
  familyArray,
  familyNegativeArray,
  musicArray,
  musicNegativeArray,
  homeArray,
  homeNegativeArray,
  stressArray,
  stressNegativeArray,
  careerArray,
  careerNegativeArray,
  promotArray,
  promotNegativeArray,
  salariArray,
  salariNegativeArray,
  interviewArray,
  interviewNegativeArray,
  freelancArray,
  freelancNegativeArray,
  projectArray,
  projectNegativeArray,
  clientArray,
  clientNegativeArray,
  officeArray,
  officeNegativeArray,
  homeworkArray,
  homeworkNegativeArray,
  assignArray,
  assignNegativeArray,
  examArray,
  examNegativeArray,
  gradeArray,
  gradeNegativeArray,
  lecturArray,
  lecturNegativeArray,
  researchArray,
  researchNegativeArray,
  partnerArray,
  partnerNegativeArray,
  spousArray,
  spousNegativeArray,
  exArray,
  exNegativeArray,
  fiancArray,
  fiancNegativeArray,
  inlawArray,
  inlawNegativeArray,
  stepfamArray,
  stepfamNegativeArray,
  childArray,
  childNegativeArray,
  petArray,
  petNegativeArray,
  anxietArray,
  anxietNegativeArray,
  depressArray,
  depressNegativeArray,
  happiArray,
  happiNegativeArray,
  angerArray,
  angerNegativeArray,
  madArray,
  madNegativeArray,
  excitArray,
  excitNegativeArray,
  fearArray,
  fearNegativeArray,
  reliefArray,
  reliefNegativeArray,
  healthArray,
  healthNegativeArray,
  fitArray,
  fitNegativeArray,
  dietArray,
  dietNegativeArray,
  travelArray,
  travelNegativeArray,
  hobbiArray,
  hobbiNegativeArray,
  sportArray,
  sportNegativeArray,
  entertainArray,
  entertainNegativeArray,
  socialArray,
  socialNegativeArray,
  politArray,
  politNegativeArray,
  religionArray,
  religionNegativeArray,
  culturArray,
  culturNegativeArray,
  environArray,
  environNegativeArray,
  financArray,
  financNegativeArray,
  goalArray,
  goalNegativeArray,
  timeArray,
  timeNegativeArray,
  futurArray,
  futurNegativeArray,
} = require("./thoughts");

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function SAPP(lastUserMessage) {
  let thought = "";

  // Split the message into sentences
  const sentences = lastUserMessage.toLowerCase().split(". ");

  // Initialize keyword stems
  const { keywordStems } = require("./keywordStems");

  console.log("Entering keyword loop. Beginning Sentiment Pre-Processing...");

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

      // console.log(`Sentence: ${relevantSentence}`);
      // console.log(`Sentiment Score: ${sentimentScore}`);

      switch (keywordStem) {
        case "exist":
          thought =
            sentimentScore >= 0
              ? getRandomElement(existentialismArray)
              : getRandomElement(existentialismNegativeArray);
          break;
        case "philosoph":
          thought =
            sentimentScore >= 0
              ? getRandomElement(philosophArray)
              : getRandomElement(philosophNegativeArray);
          break;
        case "love":
          thought =
            sentimentScore >= 0
              ? getRandomElement(loveArray)
              : getRandomElement(loveNegativeArray);
          break;
        case "romanc":
          thought =
            sentimentScore >= 0
              ? getRandomElement(romanceArray)
              : getRandomElement(romanceNegativeArray);
          break;
        case "lone":
        case "alon":
          thought =
            sentimentScore >= 0
              ? getRandomElement(lonelinessArray)
              : getRandomElement(lonelinessNegativeArray);
          break;
        case "job":
          thought =
            sentimentScore >= 0
              ? getRandomElement(jobArray)
              : getRandomElement(jobNegativeArray);
          break;
        case "employ":
          thought =
            sentimentScore >= 0
              ? getRandomElement(employArray)
              : getRandomElement(employNegativeArray);
          break;
        case "boss":
          thought =
            sentimentScore >= 0
              ? getRandomElement(bossArray)
              : getRandomElement(bossNegativeArray);
          break;
        case "cowork":
          thought =
            sentimentScore >= 0
              ? getRandomElement(coworkArray)
              : getRandomElement(coworkNegativeArray);
          break;
        case "school":
          thought =
            sentimentScore >= 0
              ? getRandomElement(schoolArray)
              : getRandomElement(schoolNegativeArray);
          break;
        case "colleg":
          thought =
            sentimentScore >= 0
              ? getRandomElement(collegeArray)
              : getRandomElement(collegeNegativeArray);
          break;
        case "univers":
          thought =
            sentimentScore >= 0
              ? getRandomElement(universArray)
              : getRandomElement(universNegativeArray);
          break;
        case "highschool":
          thought =
            sentimentScore >= 0
              ? getRandomElement(highschoolArray)
              : getRandomElement(highschoolNegativeArray);
          break;
        case "study":
          thought =
            sentimentScore >= 0
              ? getRandomElement(studyArray)
              : getRandomElement(studyNegativeArray);
          break;
        case "teach":
          thought =
            sentimentScore >= 0
              ? getRandomElement(teachArray)
              : getRandomElement(teachNegativeArray);
          break;
        case "profess":
          thought =
            sentimentScore >= 0
              ? getRandomElement(professArray)
              : getRandomElement(professNegativeArray);
          break;
        case "family":
          thought =
            sentimentScore >= 0
              ? getRandomElement(familyArray)
              : getRandomElement(familyNegativeArray);
          break;
        case "music":
          thought =
            sentimentScore >= 0
              ? getRandomElement(musicArray)
              : getRandomElement(musicNegativeArray);
          break;
        case "home":
          thought =
            sentimentScore >= 0
              ? getRandomElement(homeArray)
              : getRandomElement(homeNegativeArray);
          break;
        case "stress":
          thought =
            sentimentScore >= 0
              ? getRandomElement(stressArray)
              : getRandomElement(stressNegativeArray);
          break;
        case "career":
          thought =
            sentimentScore >= 0
              ? getRandomElement(careerArray)
              : getRandomElement(careerNegativeArray);
          break;
        case "promot":
          thought =
            sentimentScore >= 0
              ? getRandomElement(promotArray)
              : getRandomElement(promotNegativeArray);
          break;
        case "salari":
          thought =
            sentimentScore >= 0
              ? getRandomElement(salariArray)
              : getRandomElement(salariNegativeArray);
          break;
        case "interview":
          thought =
            sentimentScore >= 0
              ? getRandomElement(interviewArray)
              : getRandomElement(interviewNegativeArray);
          break;
        case "freelanc":
          thought =
            sentimentScore >= 0
              ? getRandomElement(freelancArray)
              : getRandomElement(freelancNegativeArray);
          break;
        case "project":
          thought =
            sentimentScore >= 0
              ? getRandomElement(projectArray)
              : getRandomElement(projectNegativeArray);
          break;
        case "client":
          thought =
            sentimentScore >= 0
              ? getRandomElement(clientArray)
              : getRandomElement(clientNegativeArray);
          break;
        case "office":
          thought =
            sentimentScore >= 0
              ? getRandomElement(officeArray)
              : getRandomElement(officeNegativeArray);
          break;
        case "homework":
          thought =
            sentimentScore >= 0
              ? getRandomElement(homeworkArray)
              : getRandomElement(homeworkNegativeArray);
          break;
        case "assign":
          thought =
            sentimentScore >= 0
              ? getRandomElement(assignArray)
              : getRandomElement(assignNegativeArray);
          break;
        case "exam":
          thought =
            sentimentScore >= 0
              ? getRandomElement(examArray)
              : getRandomElement(examNegativeArray);
          break;
        case "grade":
          thought =
            sentimentScore >= 0
              ? getRandomElement(gradeArray)
              : getRandomElement(gradeNegativeArray);
          break;
        case "lectur":
          thought =
            sentimentScore >= 0
              ? getRandomElement(lecturArray)
              : getRandomElement(lecturNegativeArray);
          break;
        case "research":
          thought =
            sentimentScore >= 0
              ? getRandomElement(researchArray)
              : getRandomElement(researchNegativeArray);
          break;
        case "partner":
          thought =
            sentimentScore >= 0
              ? getRandomElement(partnerArray)
              : getRandomElement(partnerNegativeArray);
          break;
        case "spous":
          thought =
            sentimentScore >= 0
              ? getRandomElement(spousArray)
              : getRandomElement(spousNegativeArray);
          break;
        case "ex":
          thought =
            sentimentScore >= 0
              ? getRandomElement(exArray)
              : getRandomElement(exNegativeArray);
          break;
        case "fianc":
          thought =
            sentimentScore >= 0
              ? getRandomElement(fiancArray)
              : getRandomElement(fiancNegativeArray);
          break;
        case "in-law":
          thought =
            sentimentScore >= 0
              ? getRandomElement(inlawArray)
              : getRandomElement(inlawNegativeArray);
          break;
        case "stepfam":
          thought =
            sentimentScore >= 0
              ? getRandomElement(stepfamArray)
              : getRandomElement(stepfamNegativeArray);
          break;
        case "child":
          thought =
            sentimentScore >= 0
              ? getRandomElement(childArray)
              : getRandomElement(childNegativeArray);
          break;
        case "pet":
          thought =
            sentimentScore >= 0
              ? getRandomElement(petArray)
              : getRandomElement(petNegativeArray);
          break;
        case "anxiet":
          thought =
            sentimentScore >= 0
              ? getRandomElement(anxietArray)
              : getRandomElement(anxietNegativeArray);
          break;
        case "depress":
          thought =
            sentimentScore >= 0
              ? getRandomElement(depressArray)
              : getRandomElement(depressNegativeArray);
          break;
        case "happi":
          thought =
            sentimentScore >= 0
              ? getRandomElement(happiArray)
              : getRandomElement(happiNegativeArray);
          break;
        case "anger":
          thought =
            sentimentScore >= 0
              ? getRandomElement(angerArray)
              : getRandomElement(angerNegativeArray);
          break;
        case "mad":
          thought =
            sentimentScore >= 0
              ? getRandomElement(madArray)
              : getRandomElement(madNegativeArray);
          break;
        case "excit":
          thought =
            sentimentScore >= 0
              ? getRandomElement(excitArray)
              : getRandomElement(excitNegativeArray);
          break;
        case "fear":
          thought =
            sentimentScore >= 0
              ? getRandomElement(fearArray)
              : getRandomElement(fearNegativeArray);
          break;
        case "relief":
          thought =
            sentimentScore >= 0
              ? getRandomElement(reliefArray)
              : getRandomElement(reliefNegativeArray);
          break;
        case "health":
          thought =
            sentimentScore >= 0
              ? getRandomElement(healthArray)
              : getRandomElement(healthNegativeArray);
          break;
        case "fit":
          thought =
            sentimentScore >= 0
              ? getRandomElement(fitArray)
              : getRandomElement(fitNegativeArray);
          break;
        case "diet":
          thought =
            sentimentScore >= 0
              ? getRandomElement(dietArray)
              : getRandomElement(dietNegativeArray);
          break;
        case "travel":
          thought =
            sentimentScore >= 0
              ? getRandomElement(travelArray)
              : getRandomElement(travelNegativeArray);
          break;
        case "hobbi":
          thought =
            sentimentScore >= 0
              ? getRandomElement(hobbiArray)
              : getRandomElement(hobbiNegativeArray);
          break;
        case "sport":
          thought =
            sentimentScore >= 0
              ? getRandomElement(sportArray)
              : getRandomElement(sportNegativeArray);
          break;
        case "entertain":
          thought =
            sentimentScore >= 0
              ? getRandomElement(entertainArray)
              : getRandomElement(entertainNegativeArray);
          break;
        case "social":
          thought =
            sentimentScore >= 0
              ? getRandomElement(socialArray)
              : getRandomElement(socialNegativeArray);
          break;
        case "polit":
          thought =
            sentimentScore >= 0
              ? getRandomElement(politArray)
              : getRandomElement(politNegativeArray);
          break;
        case "religion":
          thought =
            sentimentScore >= 0
              ? getRandomElement(religionArray)
              : getRandomElement(religionNegativeArray);
          break;
        case "cultur":
          thought =
            sentimentScore >= 0
              ? getRandomElement(culturArray)
              : getRandomElement(culturNegativeArray);
          break;
        case "environ":
          thought =
            sentimentScore >= 0
              ? getRandomElement(environArray)
              : getRandomElement(environNegativeArray);
          break;
        case "financ":
          thought =
            sentimentScore >= 0
              ? getRandomElement(financArray)
              : getRandomElement(financNegativeArray);
          break;
        case "goal":
          thought =
            sentimentScore >= 0
              ? getRandomElement(goalArray)
              : getRandomElement(goalNegativeArray);
          break;
        case "time":
          thought =
            sentimentScore >= 0
              ? getRandomElement(timeArray)
              : getRandomElement(timeNegativeArray);
          break;
        case "futur":
          thought =
            sentimentScore >= 0
              ? getRandomElement(futurArray)
              : getRandomElement(futurNegativeArray);
          break;
      }
      if (thought) break; // Exit the loop if a thought has been picked
    }
  }

  // console.log(thought);
  return thought;
}

module.exports = { SAPP };
