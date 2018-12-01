"use strict";

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


function makeArrayCountingUpward(limit) {
  let array = [];
  for (let i = 0; i < limit; i++) {
    array.push(i);
  }
  return array;
}

// Compute a number some fraction of the way between two numbers (linear
// interpolation). t is the fraction from 0 to 1, and v0 and v1 are the numbers.
function lerp(v0, v1, t) {
  return ((1 - t) * v0) + (t * v1);
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
