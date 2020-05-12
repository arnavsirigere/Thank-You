class Vehicle {
  constructor(pos) {
    this.off = random(50);
    this.pos = pos.add(this.off);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maximumforce = 1;
    this.maximumspeed = 5;
    this.hue = 0;
  }

  move() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    if (!changeTarget) {
      this.hue = map(this.pos.x, 0, width, 0, 255);
    } else {
      this.hue = map(this.pos.x, 0, width, 255, 0);
    }
    let c = color(this.hue, 255, 255);
    fill(c);
    stroke(c);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
  }

  applyBehavior(target) {
    let seek = this.find(target);
    this.vel.add(seek);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
    flee.mult(5);
    seek.mult(1);
    this.vel.add(flee);
  }

  find(target) {
    let speed = this.maximumspeed;
    let desire = p5.Vector.sub(target, this.pos);
    let speedIndicator = desire.mag();
    if (speedIndicator < 100) speed = map(speedIndicator, 0, 100, 0, this.maximumspeed);
    desire.setMag(speed);
    let steer = p5.Vector.sub(desire, this.vel);
    steer.limit(this.maximumforce);
    return steer;
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 100) {
      desired.setMag(this.maximumspeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maximumforce);
      return steer;
    } else {
      return createVector();
    }
  }
}
