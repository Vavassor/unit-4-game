"use strict";

function lerp(v0, v1, t) {
  return ((1 - t) * v0) + (t * v1);
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Colour {
  constructor(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
  }

  makeRgbText() {
    const r = Math.floor(255 * this.r);
    const g = Math.floor(255 * this.g);
    const b = Math.floor(255 * this.b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  static lerp(v0, v1, t) {
    const r = lerp(v0.r, v1.r, t);
    const g = lerp(v0.g, v1.g, t);
    const b = lerp(v0.b, v1.b, t);
    return new Colour(r, g, b);
  }
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

  animateScoreColour() {
    const mix = this.score / this.goalNumber;
    const endColour = new Colour(1, .0588, .2313);
    const startColour = new Colour(.6863, .6863, .6863);
    const colour = Colour.lerp(startColour, endColour, mix);
    const value = colour.makeRgbText();
    $(".score-group").css("background-color", value);
  }

  chooseCrystal(index) {
    this.score += this.crystalValues[index];
    $("#score").text(this.score);

    if (this.score > this.goalNumber) {
      this.lose();
    } else if (this.score == this.goalNumber) {
      this.win();
    } else {
      this.animateScoreColour();
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
    $(".score-group").css("background-color", "#afafaf");
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
