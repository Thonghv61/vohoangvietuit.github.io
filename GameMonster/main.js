//Main Canvas
var containCanvas = document.getElementById("containCanvas");
var ctx = containCanvas.getContext("2d");
//Menu canvas
var menuCanvas = document.getElementById("menuCanvas");
ctxMenu = menuCanvas.getContext("2d");

const FPS = 60;
//frame per second
const TICKS = 1000 / FPS;

//speed monster
var speedArr = [ 2, 4, 6, 10]; 

//score begin
var score = 100; 

//status game
var running = true;

//heart
var heart = 3;
var end = false; 
var highScore = 0; 
var level = 0; 
var speed = speedArr[0]; 

var boomNum = 3;
var bloodList = [];

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();

//Init High Score Session Storage
if (sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore", 0);
} else {
	highScore = sessionStorage.getItem("highscore");
}

/**
 * Class Monster
 * 
 */
function Monster(initX, initY, x, y, toX, toY, initToX, initToY, die, dieX, dieY, visible) {
	this.initX   = initX;   //position x default
	this.initY   = initY;   //position y default
	this.x       = x;       //position x current
	this.y       = y;       //position y current
	this.toX     = toX;     //move to position x
	this.toY     = toY;     //move to position y
	this.initToX = initToX; //move to position x default
	this.initToY = initToY; //move to position y default
	this.die     = die;     //boolean die
	this.dieX    = dieX;    //position x when die
	this.dieY    = dieY;    //position y when die
	this.visible = visible; //boolean visible
}

//Add method move monster
Monster.prototype.move = function() {

	if (this.x == this.toX && this.y == this.toY) {
		this.x = this.toX;
		this.y = this.toY;
		this.toX = this.initX;
		this.toY = this.initY;
	}

	if (this.x < this.toX) {
		this.x += speed;
	} else if (this.x > this.toX) {
		this.x -= speed;
	}
	if (this.y < this.toY) {
		this.y += speed;
	} else if (this.y > this.toY) {
		this.y -= speed;
	}

	//disable monster
	if (this.x == this.initX && this.y == this.initY) {
		this.visible = false;
		this.x = this.initX;
		this.y = this.initY;
		this.toX = this.initToX;
		this.toY = this.initToY;
		score -= 10;
		randomMonster();
	}
};

//Init ojbect monster form class Monster
var monster1 = new Monster(0,   0,   0,   0,   120, 120, 120, 120, false, 0, 0, true);
var monster2 = new Monster(210, 0,   210, 0,   210, 120, 210, 120, false, 0, 0, false);
var monster3 = new Monster(420, 0,   420, 0,   300, 120, 300, 120, false, 0, 0, false);
var monster4 = new Monster(0,   210, 0,   210, 120, 210, 120, 210, false, 0, 0, false);
var monster5 = new Monster(420, 210, 420, 210, 300, 210, 300, 210, false, 0, 0, false);
var monster6 = new Monster(0,   420, 0,   420, 120, 300, 120, 300, false, 0, 0, false);
var monster7 = new Monster(210, 420, 210, 420, 210, 300, 210, 300, false, 0, 0, false);
var monster8 = new Monster(420, 420, 420, 420, 300, 300, 300, 300, false, 0, 0, false);

/*=============================================
=            RESOURCE GAME            =
=============================================*/

//Main Background
var bgImage = new Image();
bgImage.src = "images/mainbg.png";

//Menu Background
var mnImage = new Image();
mnImage.src = "images/menubg.png";

//--------Monster-----------//
var monsterImage = new Image();

//Monster Terroza
var monsterTerrozaImage = new Image();
monsterTerrozaImage.src = "images/Terroza.png";
monsterImageSize = {
	width: 100,
	height: 100
};

//monster Scary
var monsterScaryImage = new Image();
monsterScaryImage.src = "images/Scary.png";

//monster Jake
var monsterJakeImage = new Image();
monsterJakeImage.src = "images/Jake.png";

//monster Sea
var monsterSeaImage = new Image();
monsterSeaImage.src = "images/Sea.png";

monsterImage = monsterTerrozaImage;
//------End monster--------//

//Blood
var bloodImage = new Image();
bloodImage.src = "images/blood.png";

//Bom
var boomImage = new Image();
boomImage.src = "images/bombb.png";

//Explosion
var explosionReady = false;
var explosionImage = new Image();
explosionImage.src = "images/boom.png";

//Heart
var heartImage = new Image();
heartImage.src = "images/heart.png";

//Pause
var pauseImage = new Image();
pauseImage.src = "images/pause_btn.png";

//Play
var playImage = new Image();
playImage.src = "images/play.png";

//Restart
var restartImage = new Image();
restartImage.src = "images/restart_btn.png";

//Game over
var overImage = new Image();
overImage.src = "images/over.png";

//SOUND EFFECT 
var swordrawSound = new Audio("sound/swordraw.wav");
var gameoverSound = new Audio("sound/gameover.wav");
var bombSound = new Audio("sound/bomb.wav");

/*=====  End of RESOURCE GAME  ======*/


/**
 * Event click container
 *
 */
containCanvas.addEventListener("click", function(e) {
	var xPosition = e.pageX - this.offsetLeft;
	var yPosition = e.pageY - this.offsetTop;
	score -= 5;
	heart--;

	//if monster visible call clickMonster
	if (monster1.visible) {
		clickMonster(xPosition, yPosition, monster1);
	}
	if (monster2.visible) {
		clickMonster(xPosition, yPosition, monster2);
	}
	if (monster3.visible) {
		clickMonster(xPosition, yPosition, monster3);
	}
	if (monster4.visible) {
		clickMonster(xPosition, yPosition, monster4);
	}
	if (monster5.visible) {
		clickMonster(xPosition, yPosition, monster5);
	}
	if (monster6.visible) {
		clickMonster(xPosition, yPosition, monster6);
	}
	if (monster7.visible) {
		clickMonster(xPosition, yPosition, monster7);
	}
	if (monster8.visible) {
		clickMonster(xPosition, yPosition, monster8);
	}
});

/**
 * Event click menu
 *
 */
menuCanvas.addEventListener("click", function(e){
	//Position mouse
	var xPosition = e.pageX - this.offsetLeft;
	var yPosition = e.pageY - this.offsetTop;

	//boom explosion
	if(xPosition > 430 && xPosition < 485 && yPosition > 25 && yPosition < 80) {
		killAll();
	}

	//pause
	if(xPosition > 380 && xPosition < 420 && yPosition > 35 && yPosition < 75) {
		if(running == true) {
			running = false;
		}
		else if(running == false) {
			running = true;
			main();
		}
	}

	//restart
	if(xPosition > 320 && xPosition < 360 && yPosition > 35 && yPosition < 75) {
		resetGame();
	}	
});

/**
 * Determine the monster clicked to define monster, blood, sound, score,..
 * @param {currX} position mouse x
 * @param {currY} position mouse y
 * @param {monster} object monster
 */
function clickMonster(currX, currY, monster) {
	//Determine monster have clicked
	if (currX >= monster.x && currX <= monster.x + monsterImageSize.width && currY >= monster.y && currY <= monster.y + monsterImageSize.height) {
		score += 10;
		heart++;
		//define monster died 
		monster.visible = false;
		monster.die = true;
		monster.dieX = currX;
		monster.dieY = currY;
		monster.x = monster.initX;
		monster.y = monster.initY;
		monster.toX = monster.initToX;
		monster.toY = monster.initToY;

		//blood position
		var blood = {};
		blood.x = monster.dieX;
		blood.y = monster.dieY;

		//list blood
		bloodList[bloodList.length] = blood;

		if (bloodList.length > 5) {
			bloodList.splice(0, 1);
		}

		//level
		var levelBefore = level;
		level = Math.floor((score - 100) / 100);
		if (level < levelBefore) {
			level = levelBefore;
		}
/*		if (level > 0) {
			monsterImage = monsterJakeImage;
		}*/
		if (level > 3) {
			level = 3;
		}
		for (li = 0; li <= level; li++) {
			randomMonster();
		}
		//randomMonster();
		changeMonster(level);
		increaseSpeed(level);

		//sound
		if(running){
			swordrawSound.play();
		}
		
	}
}

/**
 * Kill all Monster current
 */
function killAll() {
	if (boomNum > 0 && end == false) {
		boomNum--;
		explosionReady = true;
		if (monster1.visible == true) {
			monster1.visible = false;
			score += 10;
		}
		if (monster2.visible == true) {
			monster2.visible = false;
			score += 10;
		}
		if (monster3.visible == true) {
			monster3.visible = false;
			score += 10;
		}
		if (monster4.visible == true) {
			monster4.visible = false;
			score += 10;
		}
		if (monster5.visible == true) {
			monster5.visible = false;
			score += 10;
		}
		if (monster6.visible == true) {
			monster6.visible = false;
			score += 10;
		}
		if (monster7.visible == true) {
			monster7.visible = false;
			score += 10;
		}
		if (monster8.visible == true) {
			monster8.visible = false;
			score += 10;
		}
		setTimeout(function() {
			randomMonster();
			explosionReady = false;
		}, 1000);		
		//sound boom 
		bombSound.play();
	}
}

//Define speed Monster
function increaseSpeed(level) {
	speed = speedArr[level];
}

/**
 * Change Monster with param level
 * param {level}
 */
function changeMonster(level) {
	switch(level) {
		case 1: 
		monsterImage = monsterScaryImage;
		break;
		case 2:
		monsterImage = monsterJakeImage; 
		break;
		case 3:
		monsterImage = monsterSeaImage;
		break;
		case 4:
		monsterImage = monsterSeaImage;
		break;
		default: 
		break;
	}
}

/**
 * Create Random Monster
 *
 */
function randomMonster() {
	var random = Math.floor((Math.random() * 8) + 1);
	switch (random) {
		case 1:
		if (!monster1.visible) {
			monster1.visible = true;
			monster1.die = false;
		}
		break;
		case 2:
		if (!monster2.visible) {
			monster2.visible = true;
			monster2.die = false;
		}
		break;
		case 3:
		if (!monster3.visible) {
			monster3.visible = true;
			monster3.die = false;
		}
		break;
		case 4:
		if (!monster4.visible) {
			monster4.visible = true;
			monster4.die = false;
		}
		break;
		case 5:
		if (!monster5.visible) {
			monster5.visible = true;
			monster5.die = false;
		}
		break;
		case 6:
		if (!monster6.visible) {
			monster6.visible = true;
			monster6.die = false;
		}
		break;
		case 7:
		if (!monster7.visible) {
			monster7.visible = true;
			monster7.die = false;
		}
		break;
		case 8:
		if (!monster8.visible) {
			monster8.visible = true;
			monster8.die = false;
		}
		break;
	}
}

/**
 * Render background, items, monster, score,... 
 *
 */
function render() {

	/*----------  Contain canvas  ----------*/
	//background
	ctx.drawImage(bgImage, 0, 0);

	//boom no
	if(explosionReady) {
		ctx.drawImage(explosionImage, 100, 100, 300, 300);
	}

	//list blood
	if (bloodList.length > 0) {
		for (bi = 0; bi < bloodList.length; bi++) {
			ctx.drawImage(bloodImage, bloodList[bi].x - 50, bloodList[bi].y - 50);
		}
	}

	//level
	ctx.fillStyle = "#F1F1F1";
	ctx.font = "24px Arial";
	ctx.fillText("Level: " + (level + 1), 25, 32);

	//monster
	if (monster1.visible)
		ctx.drawImage(monsterImage, monster1.x, monster1.y, 100, 100);
	if (monster2.visible)
		ctx.drawImage(monsterImage, monster2.x, monster2.y, 100, 100);
	if (monster3.visible)
		ctx.drawImage(monsterImage, monster3.x, monster3.y, 100, 100);
	if (monster4.visible)
		ctx.drawImage(monsterImage, monster4.x, monster4.y, 100, 100);
	if (monster5.visible)
		ctx.drawImage(monsterImage, monster5.x, monster5.y, 100, 100);
	if (monster6.visible)
		ctx.drawImage(monsterImage, monster6.x, monster6.y, 100, 100);
	if (monster7.visible)
		ctx.drawImage(monsterImage, monster7.x, monster7.y, 100, 100);
	if (monster8.visible)
		ctx.drawImage(monsterImage, monster8.x, monster8.y, 100, 100);

	/*----------  End Contain canvas  ----------*/

	/*----------  Menu canvas  ----------*/
	//background menu
	ctxMenu.drawImage(mnImage, 0, 0);
	//Boom
	ctxMenu.drawImage(boomImage, 430, 25, 55, 55);
	//Pause
	ctxMenu.drawImage(pauseImage, 380, 35, 40, 40);	
	//Restart
	ctxMenu.drawImage(restartImage, 320, 35, 40, 40);
	//heart img
	var xH = 90;
	for(h = 1; h <= heart; h++) {
		ctxMenu.drawImage(heartImage, xH, 15);
		xH += 34;
	}
	ctxMenu.font = "25px Arial";
	ctxMenu.fillStyle = "#FFF";
	//Heart
	ctxMenu.fillText("Heart:", 10, 35);
	//Score
	ctxMenu.fillText("Score: " + score, 10, 70);
	//Number Boom
	ctxMenu.fillText(boomNum, 465, 40);

	/*----------  End Menu canvas  ----------*/
}

/**
 * Update Game
 *
 */
function update() {
	if (monster1.visible)
		monster1.move();
	if (monster2.visible)
		monster2.move();
	if (monster3.visible)
		monster3.move();
	if (monster4.visible)
		monster4.move();
	if (monster5.visible)
		monster5.move();
	if (monster6.visible)
		monster6.move();
	if (monster7.visible)
		monster7.move();
	if (monster8.visible)
		monster8.move();
}

/**
 * Reset Game
 * set all to begin game
 */
function resetGame() {
	initMonster(monster1);
	initMonster(monster2);
	initMonster(monster3);
	initMonster(monster4);
	initMonster(monster5);
	initMonster(monster6);
	initMonster(monster7);
	initMonster(monster8);

	level = 0;
	end = false;
	running = true;
	score = 100;
	heart = 3;
	monsterImage = monsterTerrozaImage;
	highScore = sessionStorage.getItem("highscore");
	boomNum = 3;
	bloodList = [];

	monster1.visible = true;
	main();
}

/**
 * Set game over
 *
 */
function overGame() {
	end = true;
	running = false;
	gameoverSound.play();
}

/**
 * Init Monster with default property  
 *
 */
function initMonster(monster) {
	monster.x = monster.initX;
	monster.y = monster.initY;
	monster.toX = monster.initToX;
	monster.toY = monster.initToY;
	speed = speedArr[0];
	monster.die = false;
	monster.dieX = 0;
	monster.visible = false;
}

/**
 * Main function
 *
 */
function main() {
	if (heart < 0 || score < 0) {
		overGame();
	}
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if (differentTime >= TICKS) {
		update();
		render();
		lastUpdateTime = now;
	}

	if (running) {
		requestAnimationFrame(main);
	} else if (!running && !end) {
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial";
		ctx.fillText("PAUSE", 200, 250);
	} else if (!running && end) {
		if (score > highScore) {
			highScore = score;
			sessionStorage.setItem("highscore", score);

			ctx.fillStyle = "#F1F1F1";
			ctx.font = "35px Arial bold";
			ctx.fillText("NEW HIGHSCORE: " + highScore, 100, 290);
		} else {
			ctx.fillStyle = "#F1F1F1";
			ctx.font = "35px Arial bold";
			ctx.fillText("SCORE: " + score, 150, 290);
		}
		//ctx.drawImage(overImage, 0, 0, 500, 500);
		ctx.fillStyle = "#ff0000";
		ctx.font = "50px Arial bold";
		ctx.fillText("GAME OVER", 120, 250);
	}

}

//Run
main();