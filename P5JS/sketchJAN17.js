var w;

function setup() {
  createCanvas(640, 360, WEBGL);
  // Make a Walker object
  w = new Walker();
  s = 'Im The Walker';
}

function draw() {
  background(51);
  rotateX(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  fill(255,255,204)
  cone(40, 70);
  // Add the text s
  textSize(32);   
  fill(255,255,255);
  text(s, 200, 110, 170, 180);

  
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
    fill(0,0,128);
    quad(this.pos.x, this.pos.y, 100, 100,169, 163, 130, 176);
  }
 
}