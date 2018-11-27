"use strict";

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
  constructor() {
    this.crystalValues = [];
    this.goalNumber = 0;
    this.losses = 0;
    this.score = 0;
    this.wins = 0;

    $("#losses").text("0");
    $("#wins").text("0");
  }

  chooseCrystal(index) {
    this.score += this.crystalValues[index];
    $("#score").text(this.score);

    if (this.score > this.goalNumber) {
      this.lose();
    } else if (this.score == this.goalNumber) {
      this.win();
    }
  }

  lose() {
    this.losses += 1;
    $("#losses").text(this.losses);
    this.startNewGame();
  }

  startNewGame() {
    for (let i = 0; i < 4; i++) {
      this.crystalValues[i] = randomIntRange(1, 12);
    }
    this.goalNumber = randomIntRange(19, 120);
    this.score = 0;
    $("#goal-number").text(this.goalNumber);
    $("#score").text(this.score);
  }

  win() {
    this.wins += 1;
    $("#wins").text(this.wins);
    this.startNewGame();
  }
}

$(document).ready(() => {
  const game = new Game();
  game.startNewGame();

  $(".crystal").click((event) => {
    const value = $(event.currentTarget).val();
    const index = parseInt(value);
    game.chooseCrystal(index);
  });
});
