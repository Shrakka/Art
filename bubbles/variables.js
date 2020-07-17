const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const NB_BUBBLES = 150;

const BACKGROUND_COLOR = [240, 240, 250];
const COLORS = [
  'rgb(148, 0, 211)',
  'rgb(75, 0, 130)',
  'rgb(0, 0, 255)',
  'rgb(0, 255, 0)',
  'rgb(255, 255, 0)',
  'rgb(255, 127, 0)',
  'rgb(255, 0, 0)',
];
const SLICE_SIZE = WIDTH/(COLORS.length-1);
const STEPS = COLORS.map((_, index) => index);

const SPEED = 1;
const EXPLODING_SPEED = 10;

const BUBBLE_MODE = true;