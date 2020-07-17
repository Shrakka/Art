class Bubble {
  constructor() {
    this.x = random(WIDTH);
    this.y = random(HEIGHT);
    this.sizeMax = round(random(10, 40));
    this.len = round(this.sizeMax / 2);
    this.sign = random(1) > 0.5 ? 1 : -1;
    this.direction = random(2*Math.PI);
    this.velocity = random(3);
    this.exploding = false;
    this.out = false;
  }

  getColor() {
    const index = Math.floor(this.x / (SLICE_SIZE + 1));
    const from = color(COLORS[index]);
    const to = color(COLORS[index + 1]);
    const percent = (this.x - SLICE_SIZE * index) / SLICE_SIZE;
    return lerpColor(from, to, percent);
  }

  show() {
    noStroke()
    fill(this.getColor());
    ellipse(this.x, this.y, this.len, this.len);
  }

  growShrink() {
    if (this.len >= this.sizeMax) {
      this.sign = -1;
    }
    if (this.len <= 0) {
      this.sign = 1;
    }
    this.len += SPEED * this.sign;
  }

  move() {
    this.x += (this.velocity * Math.cos(this.direction));
    this.y += (this.velocity * Math.sin(this.direction));
    if (this.x > WIDTH) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = WIDTH;
    }
    if (this.y > HEIGHT) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = HEIGHT;
    }
  }

  explode() {
    this.exploding = true;
    this.len += EXPLODING_SPEED;
    if (this.len > WIDTH / 4) {
      this.out = true;
    }
  }
}
