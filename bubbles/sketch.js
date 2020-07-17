const bubbles = [];

// ---- API P5JS functions ----

function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(RGB);
  background(...BACKGROUND_COLOR);
  for (let i = 0; i < NB_BUBBLES; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
	resetBackGroundIfBubbleMode();

  for (const bubble of bubbles) {
    if (bubble.out) { continue; }

    if (bubble.exploding) {
      bubble.explode();
    } else {
      bubble.growShrink();
    }

    bubble.move();
    bubble.show();
  }
}

function mouseClicked() {
	setExplodingModeForRandomBubble();
}

// ------ UTILS ------- //

function resetBackGroundIfBubbleMode() {
	if (BUBBLE_MODE) {
  	background(...BACKGROUND_COLOR);
	}
}

function setExplodingModeForRandomBubble() {
	const nonExplodingBubbles = bubbles
		.map(({ exploding }, index) => ({ exploding, index }))
		.filter(bubble => ! bubble.exploding)
		.map(bubble => bubble.index);
	const randomIndex = nonExplodingBubbles[Math.floor(Math.random() * nonExplodingBubbles.length)] || 0;
	bubbles[randomIndex].exploding = true;
}