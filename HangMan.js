const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("What is your name ? ", function (name) {
//   rl.question("Where do you live ? ", function (country) {
//     console.log(`${name}, is a citizen of ${country}`);
//     rl.close();
//   });
// });

// rl.on("close", function () {
//   console.log("\nBYE BYE !!!");
//   process.exit(0);
// });

let alpha = [];
let word = "";

const HangMan = () => {
  // Handle stream
  rl.question("Input: ", (letter) => {
    if (letter.length !== 1) {
      console.log("Input a letter");
    }
    alpha.push(letter);
    rl.close();
  });
};

rl.on("close", () => {
  console.log(alpha);
});

HangMan();

// Notes

// Sanitize input (toLowerCase), input !== 1, check for non-letter
// Letter has been input already: Doesn't exist, Exists but has already been used (regardless of true/false)
// Hangman counter is set to 5, if 5 then the game is over.

// Might have to run it as part of a nodemon process, that way when the user inputs it'll run a function call then repeat from the beginning.
// It might have to be async, since the input will need to process before it re-renders with the game board.
// The process will probably follow a simple flow -
// User inputs a letter
// Code will santize the input, checking for anything longer than a single character or a symbol before passing it down, making sure it's lowercase
// Checks and balances -
// Check letter against existing array of letters
// If the letter exists and has already been played, ask for a new input
// If the letter does not exist and has already been played, ask for a new input
// If the letter does not exist and has not been played, increment the hangman counter
// If the letter exists and has not been played, add the letters to the game board
// Pre-run checks -
// If the hangman counter is equal to 5, the game is over. Return prompt that the user lost.
// If the word has been completed, the game is won. Return prompt that the user won.

// !! Example
// "heo"
// Hangman: 2 (5 is a loss)
// a, c, e, o, h
// input:

// !! User Loss
// "heo"
// Hangman: 5 (5 is a loss)
// a, c, e, o, h, f, g, p
// You Lose.. :(

// !! User Win
// "hello"
// Hangman: 2 (5 is a loss)
// a, c, e, o, h, l
// You Win! :)
