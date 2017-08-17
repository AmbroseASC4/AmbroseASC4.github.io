var ship = [];
var asteroids = [];
var lasers = [];
var lives;
var score;
var notStarted;
var done;
var didWin;
var bg, shipImg, ballImg;
function preload() {
  shipImg = loadImage("fly.png");
  ballImg = loadImage("Pokeball.png");
}
function setup() {
  bg = loadImage("Pokebg.png");
  createCanvas(windowWidth, windowHeight);
  reset();
}
function reset() {
  lives = 3;
  score = 0;
  notStarted = true;
  done = false;
  didWin = false;
  ship.splice(0, ship.length);
  for (var i = 0; i < lives; i++) {
    ship.push(new Ship());
  }
  scoreBox = new ScoreBox();
  asteroids.splice(0, asteroids.length);
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  lasers.splice(0, lasers.length);
}
function reset_won() {
  notStarted = true;
  done = false;
  didWin = false;
  ship.splice(0, ship.length);
  for (var i = 0; i < lives; i++) {
    ship.push(new Ship());
  }
  scoreBox = new ScoreBox();
  asteroids.splice(0, asteroids.length);
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  lasers.splice(0, lasers.length);
}
function draw() {
  background(bg);
  alive: {
    if (lives > 0 && asteroids.length > 0) {
      for (var i = 0; i < asteroids.length; i++) {
        if (ship[lives - 1].hits(asteroids[i])) {
          //boom
          ship[lives - 1].render("h");
          var ms = 200;
          ms += new Date().getTime();
          while (new Date() < ms) { }
          ms = 0;
          ship.splice(lives - 1, 1);
          lives--;
          break alive;
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
      }
      for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        } else {
          for (var j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
              if (asteroids[j].r > 10) {
                var newAsteroids = asteroids[j].breakup();
                asteroids = asteroids.concat(newAsteroids);
              }
              asteroids.splice(j, 1);
              lasers.splice(i, 1);
              break;
            }
          }
        }
      }
      ship[lives - 1].render();
      ship[lives - 1].turn();
      ship[lives - 1].update();
      ship[lives - 1].edges();
      scoreBox.update();
    }
  }
  dead: {
    if (lives <= 0 && asteroids.length > 0) {
      textSize(70);
      textAlign(CENTER, BOTTOM);
      fill(255, 0, 0);
      text("YOU LOSE!", width / 2, height / 2);
      textSize(30);
      textAlign(CENTER, TOP);
      textSize(20);
      textAlign(CENTER, TOP);
      fill(0, 0, 180);
      text("Press the \"SPACE BAR\" to play again.", width / 2, height / 2 + 45);
      var ms = 1000;
      ms += new Date().getTime();
      while (new Date() < ms) { }
      ms = 0;
      done = true;
    }
  }
  if (notStarted) {
    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0, 0, 180);
    text("Press the \"SPACE BAR\" to play.", width / 2, height / 2);
    noLoop();
    pop();
  }
}
function keyReleased() {
  if (lives > 0) {
    ship[lives - 1].setRotation(0);
    ship[lives - 1].boosting(false);
    ship[lives - 1].breaking(false);
  }
}
function keyPressed() {
  if (key == ' ' && done) {
    if (!didWin) {
      reset();
    } else if (didWin) {
      reset_won();
    }
  } else if (key == ' ' && notStarted) {
    notStarted = false;
    loop();
  } else if (key == ' ' && lives > 0) {
    lasers.push(new Laser(ship[lives - 1].pos, ship[lives - 1].heading));
  } else if (keyCode == RIGHT_ARROW && lives > 0) {
    ship[lives - 1].setRotation(0.1);
  } else if (keyCode == LEFT_ARROW && lives > 0) {
    ship[lives - 1].setRotation(-0.1);
  } else if (keyCode == UP_ARROW && lives > 0) {
    ship[lives - 1].boosting(true);
  } else if (keyCode == DOWN_ARROW && lives > 0) {
    ship[lives - 1].breaking(true);
  }
}