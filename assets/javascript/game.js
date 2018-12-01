"use strict";

let crystalValues = [];
let goalNumber = 0;
let losses = 0;
let score = 0;
let wins = 0;


function animateScoreColour() {
  const mix = score / goalNumber;
  const endColour = new Colour(255, 15, 59);
  const startColour = new Colour(175, 175, 175);
  const colour = Colour.blend(startColour, endColour, mix);
  const value = colour.makeRgbText();
  $(".score-group").css("background-color", value);
}

function changeCrystalImages() {
  const colourCount = 8;
  const shapeCount = 4;

  let colours = makeArrayCountingUpward(colourCount);
  let shapes = makeArrayCountingUpward(shapeCount);
  shuffle(colours);
  shuffle(shapes);

  // Picking the first four of the shuffled arrays gives non-repeating random
  // colours and shapes, meaning two of the same image won't pop up.
  for (let i = 0; i < 4; i++) {
    const source = "assets/images/Gem-" + shapes[i] + "-" + colours[i] + ".png";
    $("#crystal-" + i).attr("src", source);
  }
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

function lose() {
  losses++;
  $("#losses").text(losses);
  startNewGame();
}

function regenerateCrystals() {
  for (let i = 0; i < 4; i++) {
    crystalValues[i] = randomIntRange(1, 12);
  }
  changeCrystalImages();
}

function startNewGame() {
  regenerateCrystals();
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
