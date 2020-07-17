var bubbles = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var N = 300;
var colors = [
	'rgb(148, 0, 211)',
	'rgb(75, 0, 130)',
	'rgb(0, 0, 255)',
	'rgb(0, 255, 0)',
	'rgb(255, 255, 0)',
	'rgb(255, 127, 0)',
	'rgb(255, 0, 0)',
];
var sliceSize = WIDTH/(colors.length-1)
var steps = colors.map((e, i) => i)

function setup() {
	createCanvas(WIDTH, HEIGHT);
	colorMode(RGB);
	for (let i = 0; i < N; i++) {
		bubbles.push(new Bubble());
	}
}

function draw() {
	background(240, 240, 250);
	for (let bubble of bubbles) {
		bubble.shrink();
		bubble.move();
		bubble.show();
	}
}

function mouseClicked() {
  	var index = round(random(bubbles.length));
    console.log(index);
    bubbles[index].explode(index);
}

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
	}

	getColor() {
		const index = steps.reduce((acc, val) => this.x > val*sliceSize ? val : acc, 0)
		const from = color(colors[index]);
		const to = color(colors[index+1]);
		const percent = (this.x - sliceSize*index)/sliceSize
		return lerpColor(from, to, percent)

	}

	show() {
		noStroke()
		fill(this.getColor());
		ellipse(this.x, this.y, this.len, this.len);
	}

	shrink() {
		if (!this.exploding) {
			if (this.len === this.sizeMax) {
				this.sign = -1;
			}
			if (this.len === 0) {
				this.sign = 1;
			}
			this.len += this.sign;
		}
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

	explode(index) {
		this.exploding = true;
		this.len = 60;
		var that = this;
		var t = 5;
		for (let i = 0; i<100; i++) {
			setTimeout(function(){
			    that.len += 2;
			    console.log(that.len);
			  }, t * i);
			if(i===99) {
				setTimeout(function() {
					bubbles.splice(index, 1);
				}, t * 99)
			}
		}
	}
}