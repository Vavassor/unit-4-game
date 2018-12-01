"use strict";

let crystalValues = [];
let goalNumber = 0;
let losses = 0;
let score = 0;
let wins = 0;


class Colour {
  constructor(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
  }

  makeRgbText() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }

  // Compute a colour some fraction of the way between two colours by linearly
  // interpolating their components.
  static blend(v0, v1, t) {
    const r = Math.floor(lerp(v0.r, v1.r, t));
    const g = Math.floor(lerp(v0.g, v1.g, t));
    const b = Math.floor(lerp(v0.b, v1.b, t));
    return new Colour(r, g, b);
  }
}


function animateScoreColour() {
  const mix = score / goalNumber;
  const endColour = new Colour(255, 15, 59);
  const startColour = new Colour(175, 175, 175);
  const colour = Colour.blend(startColour, endColour, mix);
  const value = colour.makeRgbText();
  $(".score-group").css("background-color", value);
}

function chooseCrystal(index) {
  score += crystalValues[index];

  $("#score").text(score);

  if (score > goalNumber) {
    lose();
  } else if (score == goalNumber) {
    win();
  } else {
    animateScoreColour();
  }
}

// Compute a number some fraction of the way between two numbers (linear
// interpolation). t is the fraction from 0 to 1, and v0 and v1 are the numbers.
function lerp(v0, v1, t) {
  return ((1 - t) * v0) + (t * v1);
}

function lose() {
  losses++;
  $("#losses").text(losses);
  startNewGame();
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNewGame() {
  for (let i = 0; i < 4; i++) {
    crystalValues[i] = randomIntRange(1, 12);
  }
  goalNumber = randomIntRange(19, 120);
  score = 0;
  $("#goal-number").text(goalNumber);
  $("#score").text(score);
  $(".score-group").css("background-color", "#afafaf");
}

function win() {
  wins++;
  $("#wins").text(wins);
  startNewGame();
}

function zeroStats() {
  $("#losses").text("0");
  $("#wins").text("0");
}


$(document).ready(function() {
  zeroStats();
  startNewGame();

  $(".crystal").click(function() {
    const value = $(this).val();
    const index = parseInt(value);
    chooseCrystal(index);
  });
});
