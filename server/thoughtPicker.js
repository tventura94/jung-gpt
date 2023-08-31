const {
  existentialismArray,
  philosophyArray,
  loveArray,
  lonelinessArray,
  // ... other arrays
} = require("./thoughts");

function pickThought(lastUserMessage) {
  let thought = "";

  if (
    lastUserMessage.includes("existentialism") ||
    lastUserMessage.includes("existential")
  ) {
    thought =
      existentialismArray[
        Math.floor(Math.random() * existentialismArray.length)
      ];
  } else if (
    lastUserMessage.includes("philosophy") ||
    lastUserMessage.includes("philosophical")
  ) {
    thought =
      philosophyArray[Math.floor(Math.random() * philosophyArray.length)];
  } else if (
    lastUserMessage.includes("love") ||
    lastUserMessage.includes("romance")
  ) {
    thought = loveArray[Math.floor(Math.random() * loveArray.length)];
  } else if (
    lastUserMessage.includes("lonely") ||
    lastUserMessage.includes("loneliness")
  ) {
    thought =
      lonelinessArray[Math.floor(Math.random() * lonelinessArray.length)];
  }

  // Add more conditions as needed

  return thought;
}

module.exports = { pickThought };
