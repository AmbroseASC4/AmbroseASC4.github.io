function ScoreBox() {
  this.update = function() {
    push();
    textSize(50);
    textAlign(LEFT,TOP)
    fill(255);
    text("Lives: " + lives, 10, 10);
    pop();
  }
}
