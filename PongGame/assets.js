var canvasBgImage = new Image(),
    bgPattern;
canvasBgImage.onload = function () {
  this.loaded = true;
  bgPattern = ctx.createPattern(canvasBgImage, 'repeat');
};
canvasBgImage.src = "sand.png";


var ballBgImage = new Image();
ballBgImage.src = "voltorb.gif";
ballBgImage.loaded = false; 
ballBgImage.onload = function () {
  this.loaded = true;

 
};