function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.isBreaking = false;
  this.boosting = function (b) {
    this.isBoosting = b;
  }
  this.breaking = function (b) {
    this.isBreaking = b;
  }
  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    if (this.isBreaking) {
      this.break();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }
  this.boost = function () {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }
  this.break = function () {
    var force = p5.Vector.fromAngle(this.vel.heading());
    force.mult(0.05);
    if (this.vel.mag() >= 0) {
      this.vel.sub(force);
    }
  }
  this.hits = function (asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  this.render = function (wl_) {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    if (wl_ === "w") {
      fill(0);
      stroke(0, 255, 0);
    } else if (wl_ === "h") {
      fill(255, 0, 0);
      stroke(255, 0, 0);
    } else {
      fill(0);
      stroke(255);
    }
   // triangle(-this.r/2, this.r, this.r/2, this.r, 0, -this.r);
    image(shipImg, -40, -50, 80, 100);
    pop();
  }
  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  this.setRotation = function (a) {
    this.rotation = a;
  }
  this.turn = function () {
    this.heading += this.rotation;
    this.heading %= (PI * 2);
  }
}
