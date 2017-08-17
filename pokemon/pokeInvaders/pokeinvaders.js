function Aliens(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;

}



var alien = [];

for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 5; j++) {
        alien.push(new Aliens(30 + (i * 90), 10 + (j * 80), 70, 70));
    }
}


function Shot(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
}
var shots = [];

function Bullet(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
}
var bullet = [];
var a = 0;
var x = 0;
var y = 5;
function keyPressed() {
    if (keyCode == 32) {
        shots.push(new Shot(barco.xpos + 420, 730, 45, 30));
    }
}
function addshot() {
    for (var i = 0; i < shots.length; i++) {
        fill("white");
        image(pokeImg, shots[i].xpos, shots[i].ypos, shots[i].width, shots[i].height);
        shots[i].ypos = shots[i].ypos - y;
    }
}
function addbullet() {
    for (var i = 0; i < bullet.length; i++) {
        fill("white");
        ellipse(bullet[i].xpos, bullet[i].ypos, bullet[i].width, bullet[i].height);
        bullet[i].ypos = bullet[i].ypos + y;
    }
}

function Attack(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
}



// To set up the canvas
function setup() {
    createCanvas(1350, 780);
    nice = loadImage("https://media.giphy.com/media/7cTJ3gWVsoC08/giphy.gif");
    ballImg = loadImage("https://vignette2.wikia.nocookie.net/ashsencounters/images/6/62/Ash_holding_a_Pokeball_transparent.gif/revision/latest?cb=20140701175439");
    pokeImg = loadImage("https://pbs.twimg.com/profile_images/736489088/pokebola.gif");
    pikaImg = loadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + Math.floor(Math.random() * 700) + ".png");
    bulbImg = loadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
    charImg = loadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
    mewImg = loadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png");
    lifeImg = loadImage("https://vignette2.wikia.nocookie.net/shipping/images/6/66/Pixel_heart_icon.png/revision/latest?cb=20151011174450");

}

function draw() {
    background(nice);
    drawShip();
    move();
    drawAlien();
    addshot();
    addbullet();
    disappear();
    drawScore();
    drawLives();
    shootBack();
    loseLife();

}

// To draw the main ship 
function mainShip(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
}

var barco = new mainShip(250, 550, 100, 50);

function drawShip() {
    fill('green');
    var shipXpos = (((windowWidth / 2) - 250) + x);
    image(ballImg, barco.xpos + 400, 730, 100, 50);
}

function move() {
    if (keyIsDown(LEFT_ARROW)) {
        barco.xpos = barco.xpos - 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        barco.xpos = barco.xpos + 5;
    }
}



var xspeed = 1.5;
var yspeed = 10;

function drawAlien() {
    for (var i = 0; i < alien.length; i++) {
        image(pikaImg, alien[i].xpos, alien[i].ypos, alien[i].width + 50, alien[i].height + 50);
        alien[i].xpos = alien[i].xpos + xspeed;

        if (alien[i].xpos < 0 || alien[i].xpos > 1350 - (alien[i].width)) {
            xspeed = -xspeed;
            for (var j = 0; j < alien.length; j++) {
                alien[j].ypos = alien[j].ypos + yspeed;
            }
        }
        if (alien[i].ypos >= 510) {
            loseGame();
        }
    }

}

function loseGame() {
    background("black");
    fill("white");
    textSize(50);
    textAlign(CENTER);
    text("GAME OVER", windowWidth/2, windowHeight/2);
}


function disappear() {
    for (var i = 0; i < alien.length; i++) {
        for (var j = 0; j < shots.length; j++) {
            if (shots[j].xpos >= alien[i].xpos && shots[j].xpos <= alien[i].xpos
                + alien[i].width && shots[j].ypos >= alien[i].ypos && shots[j].ypos
                <= alien[i].ypos + alien[i].height) {
                shots.splice(j, j);
                alien.splice(i, 1);
                score = score + 10;

            }

        }
    }

}

function loseLife() {
    for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < bullet.length; j++) {
            if (bullet[j].xpos >= (barco.xpos + 400) && bullet[j].xpos <= (barco.xpos + 400
                + barco.width) && bullet[j].ypos >= barco.ypos && bullet[j].ypos
                <= barco.ypos + barco.height) {
                bullet.splice(j, j);
                ships.splice(i, 1);
            }

        }

    }
    ``
}




var score = 0;

function drawScore() {
    textFont("Georgia");
    fill('white');
    textSize(30);
    text("Score: " + score, 30, 720, 200, 100);
}

function Ships(xpos, ypos, width, height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
}


var ships = [];
for (i = 0; i < 3; i++) {
    ships.push(new Ships(350 + (i * 60), 655, 50, 15));
}



function drawLives() {
        fill('white');
        textSize(30);
        text('Lives: ', 1020, 722, 100, 100);
        if (ships.length > 0) {
            for (i = 0; i < ships.length; i++) {
                fill("green");
                console.log(ships);
                image(pikaImg, ships[i].xpos + 800, ships[i].ypos + 50, ships[i].width + 40, ships[i].height + 60);
            }
        }
        else{
            loseGame();
        }

}
window.setTimeout(shootBack, 4000);
var x = Math.random();
var y = Math.floor(Math.random() * (alien.length - 1))
function shootBack() {
    if (x < 0.03) {
        bullet.push(new Bullet(alien[y].xpos, alien[y].ypos, 20, 20));
        alien[y].ypos += 0.00001;
        x = Math.random();
        y = Math.floor(Math.random() * (alien.length - 1))

    } else {
        x = Math.random();
        y = Math.floor(Math.random() * (alien.length - 1))
    }
    x = Math.random();
    y = Math.floor(Math.random() * (alien.length - 1))
}