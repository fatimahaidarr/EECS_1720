var w;

function setup() {
  createCanvas(640, 360);
  // Make a Walker object
  w = new Walker();
}

function draw() {
  background(51);
  // Update and display object
  w.update();
  w.display();
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, height / 2);

  this.update = function() {
    // Move Walker randomly
    var vel = createVector(random(-10, 5), random(-10, 5));
    this.pos.add(vel);
  }

  this.display = function() {
    // Draw Walker as a quad
    fill(100,30,170);
    quad(this.pos.x, this.pos.y, 48, 48,69, 63, 30, 76);
  }
}