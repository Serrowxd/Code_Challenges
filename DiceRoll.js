function RollDice() {
  let rolling = true;
  console.log("Rolling Dice");

  while (rolling) {
    let d1 = Math.floor(Math.random() * 6) + 1;
    let d2 = Math.floor(Math.random() * 6) + 1;

    console.log(d1, d2);

    if (d1 === d2) {
      rolling = false;
      console.log("Finished Rolling");
    }
  }
}

console.log(RollDice());

// 9/23/2020
