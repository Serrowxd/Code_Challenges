const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let alpha = [];
let storeAlpha = [];
let nonAlpha = [];
let word = "taco";
let man = 0;

const HangMan = () => {
  rl.setPrompt("Input Letter: ");
  rl.prompt();
  // Regex for all the letters of the alphabet
  let letters = /^[A-Za-z]+$/;
  // Counter for the number of matching letters
  let counter = 0;

  // Handle stream
  rl.on("line", (letter) => {
    // Check for excess length of input, or a non-letter character
    if (letter.length !== 1 || !letter.match(letters)) {
      console.log("Input a letter");
      // If input is incorrect, reprompt user for input
      console.log("----");
      rl.prompt();
    } else {
      let lowLetter = letter.toLowerCase();

      // Loop through array and check used variables
      for (let i = 0; i < alpha.length + storeAlpha.length; i++) {
        if (lowLetter === alpha[i] || lowLetter === storeAlpha[i]) {
          console.log("This letter has already been used");
          console.log("----");
          rl.prompt();
          return;
        }
      }

      // If everything passes, send it to the final check
      if (word.includes(letter)) {
        alpha.push(lowLetter);
        console.log("The letter was correct");
        console.log(`Word: ${storeAlpha}`);
        console.log(`Letters Used: ${nonAlpha}`);
        console.log(`Man: ${man} (5 is a loss)`);
        console.log("----");
        rl.prompt();
      } else {
        man = man + 1;
        nonAlpha.push(lowLetter);
        console.log("The letter was incorrect");
        console.log(`Word: ${storeAlpha}`);
        console.log(`Letters Used: ${nonAlpha}`);
        console.log(`Man: ${man} (5 is a loss)`);
        console.log("----");
        rl.prompt();
      }
    }

    // Loss Condition
    if (man === 5) {
      console.log("!!----!!");
      console.log(`Man: ${man}`);
      console.log(`The word was ${word}`);
      console.log("You lost.. :(");
      rl.close();
    }

    // Win Condition
    // Win condition is still broken
    // We need to check the alphabet storage array when santizing input
    alpha.forEach((item) => {
      if (word.includes(item)) {
        alpha.pop();
        storeAlpha.push(item);
        counter = counter + 1;
      }

      if (counter === word.length) {
        console.log("!!----!!");
        console.log(`Man: ${man}`);
        console.log(`The word was ${word}`);
        console.log("You win! :)");
        rl.close();
      }
    });
  }).on("close", () => {
    process.exit(0);
  });
};

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

// !! Scrap Code

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
