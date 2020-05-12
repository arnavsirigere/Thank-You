let font;
let points = [];
let vehicles = [];
let targets = [];
let changeTarget = false;

function preload() {
  font = loadFont('Arimo-Italic.ttf');
}

function setup() {
  createCanvas(1000, 400);
  colorMode(HSB);
  points = font.textToPoints('Thank', 50, 300, 340);
  targets = font.textToPoints('You!', 50, 300, 400);
  // Generate new vehicles
  for (let i = 0; i < points.length; i++) {
    vehicles.push(new Vehicle(createVector(points[i].x, points[i].y)));
  }
  setInterval(changeText, 3000);
}

function draw() {
  background(0);
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.show();
    vehicle.move();
    if (!changeTarget) {
      target = createVector(points[i].x, points[i].y);
    } else if (changeTarget) {
      j = constrain(i, 0, targets.length - 1);
      target = createVector(targets[j].x, targets[j].y);
    }
    vehicle.applyBehavior(target);
  }
}

function changeText() {
  changeTarget = !changeTarget;
}

// Test
