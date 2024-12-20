//Set Variables
let gameState = "runGame";

let mapGravity = 10;

let currentMap = 'forest'
let currentLevel = 0;
let activePlayer;
let spawnPoint, endPoint;
let groundSensor, cameraSensor;

let score = 0;

let levels = []

let group;

let coins, ground, underGround, platform, spikes
let coinsImg

let attacking = false
let direction = 0;
let blocking = false


let hero, partner, witch, lizard, portal, hex, frog, fly, leaf;
let heroImg, partnerImg, witchImg, lizardImg, portalImg, hexImg, frogImg, cloudImg, flyImg, leafImg;

let forestTiles;

let cloudX = 0;

let floor, waitingRoom;
let backgroundImg;

let allSpritesGroup;


// background images object
let forestBackground = [
	{
		file: './assets/backgrounds/forest/1.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: './assets/backgrounds/forest/2.png',
		img: undefined,
		x: 0,
		speed: 0.2	
	},
	{
		file: './assets/backgrounds/forest/3.png',
		img: undefined,
		x: 0,
		speed: 0.4	
	},
	{
		file: './assets/backgrounds/forest/4.png',
		img: undefined,
		x: 0,
		speed: 0.6	
	}
]

//Preload assets
function preload() {
	for (let b of forestBackground){
		b.img = loadImage(`${b.file}`)
	}

	heroImg = loadImage('./assets/player/hero.png');
	partnerImg  = loadImage('./assets/player/partner.png');
	witchImg = loadImage('./assets/boss/witch.png');
	lizardImg = loadImage('./assets/player/lizard.png');
	portalImg =loadImage('./assets/boss/portal.png');
	hexImg = loadImage('./assets/boss/hex.png');
	frogImg = loadImage('./assets/boss/frog.png');

	cloudImg =loadImage('./assets/backgrounds/forest/cloud.png');

	forestTiles = loadImage('./assets/enviroment/forestTiles2.png')
	coinsImg = loadImage('./assets/enviroment/coin.png')
	flyImg = loadImage('./assets/enemies/forest/fly.png')
	leafImg = loadImage('./assets/enemies/forest/leaf.png')
}
//let cube 
function setup() {
	allSpritesGroup = new Group();
    canvasSetup()
	world.gravity.y = mapGravity;

	allSprites.pixelPerfect = true;
	preloadLevels();
	//introCutscene();

	//Eniroment (tiles, objects etx)
	setEnviroment(forestTiles,16, 'bronze');

	changeLevel();
	//group = new Tiles(levels[0].platforms, 0, 0, ground.w, ground.h);

	spawnLizard(spawner().x,spawner().y);
	activePlayer = lizard;
	//cube = new Sprite(lizard.x+30, lizard.y,6,6)
	console.log(lizard.x, lizard.y)

	activePlayer.overlaps(spawnPoint);
	activePlayer.overlaps(coins);
	
}

function draw() {
	clear();
	if(gameState=='runGame'){

		displayBackground(currentMap, 0);

		//if (hero.y>900) resetplayer();
	
		gameDebug(true);
		gameControlls (activePlayer);
		cameraControll(activePlayer, group, 4);
		//console.log(groundSensor.overlaps(spikes))

		//Die on spikes
		if(groundSensor.overlaps(spikes)) death();

		//Change to next level
		if(lizard.overlaps(endPoint)) changeLevel();

		//collect coins
		lizard.overlaps(coins)
		keepScore();
		chaseCheck();

	}



}

//keyboard/controller controlls
function gameControlls(character){
	//----------Controls----------\\
	if((character.currentState != character.states.ATTACK) && (character.currentState != character.states.BLOCK)){
		if (kb.pressing('left')|| contro.leftStick.x < -0.25) {
			character.vel.x = -playerSpeed;
			character.mirror.x = true;
			character.changeAni('run');
			character.currentState = character.states.WALK;
			direction = -1;
			//displayBackground(currentMap, direction)
		}

		else if ((kb.pressing('right')|| contro.leftStick.x > 0.25)){
			character.vel.x = playerSpeed;
			character.changeAni('run');
			character.mirror.x = false;
			character.currentState = character.states.WALK;
			direction = 1;
			//displayBackground(currentMap, direction);
		}
		else if (kb.released('right')||kb.released('left')){
			character.changeAni('stand');
			character.vel.x = 0;
			character.currentState = character.states.IDLE;
			//displayBackground(currentMap, 0);
		}
		if (isOnGround()){
			if(kb.presses('up')){
				world.gravity.y = 15;
				character.vel.y = -5
				character.changeAni(['jump','stand'])
				world.gravity.y = 10
			}
		}
	}
	if(kb.presses('e')){
		atttack();
	}
	if(kb.presses('q')){
		block();
	}
	if(kb.released('q')){
		releaseBlock();
	}
	
}

//resets player
function resetplayer(){
    lizard.speed = 0;
    lizard.rotationSpeed = 0;
    lizard.rotation = 0;
    lizard.x = spawner().x;
    lizard.y = spawner().y;
}

//Debug function for testting
function gameDebug(showSprites){
	if (kb.pressing('`')){
		if(showSprites) allSprites.visible = true; //shows all hidden sprites
		allSprites.debug = true; //shows all colliders
		textSize(60)
		fill('white')
		text(round(frameRate()), 0, 100); //displays frames per second
	}
	else if (kb.released('`')){
		allSprites.debug = false;
		textSize(0)
	}
}

//Attack action
async function atttack() {
	lizard.vel.x = 0;
	lizard.currentState = lizard.states.ATTACK;
	attacking = true
	let attackArea = new Sprite((lizard.x+(20)*direction), (lizard.y), 17, 24) //creates an invisible sprite in front of player
	attackArea.visible = false;
	attackArea.mass = 0.0;
	lizard.overlaps(attackArea);                                               //
	attackArea.overlaps(allSprites);                                           //
	let area =  new GlueJoint(lizard, attackArea);                             //
	area.visible = false;                                                      //
	await lizard.changeAni('slash'); //plays attack animation
	lizard.changeAni('stand');       //
	await checkHit(attackArea);      //
	attackArea.remove(); //removes sprite after attackends
	lizard.currentState = lizard.states.IDLE;
	attacking =false;
}

//Block action(hold)
let blockingArea;
function block(){
	lizard.vel.x = 0;
	lizard.currentState = lizard.states.BLOCK;
	blocking = true
	blockingArea = new Sprite((lizard.x+(12)*direction), (lizard.y), 2, 24) //creates an invisible sprite in front of player
	blockingArea.visible = false;											//
	lizard.overlaps(blockingArea);											//
	blockingArea.overlaps(allSprites);										//
	let area =  new GlueJoint(lizard, blockingArea);						//
	area.visible = false;													//
	lizard.changeAni(['block','blocking'])	//blocking animation
}

//Block Action(release)
function releaseBlock(){
	lizard.changeAni(['blockRelease','stand']);
	blockingArea.remove();
	lizard.currentState = lizard.states.IDLE;
	blocking = false;
}

//helper function: Grabs and returns coordinates from spawnPoint tile
function spawner(){
	let cords = {x: spawnPoint[0].position.x+24, y: spawnPoint[0].position.y}
	return cords;
}

//check if player touches a ground surface
function isOnGround() {
	return  groundSensor.overlapping(ground)||
			groundSensor.overlapping(platform)
}

//play death animation and reset player
async function death() {
		await lizard.changeAni(['death','dead']);
		resetplayer();
		lizard.changeAni('stand')

}

//checks for coin collection and updates score
function keepScore() {
	for (let c of coins){
		if (lizard.overlaps(c)){
			c.remove();
			score++;
		}
	}
}

//Checks if attack hits an enemy
// checks if enemy x cord is close enought to the attack area sprite x cord
// this is used beacause attackArea.overlaps(enemy) doesnt work, even thought it should
async function checkHit(area){
	switch (currentMap) {
		case 'forest':					//Check only forest enemies
			attackAreaProximity(fly, area);
			attackAreaProximity(leaf, area);
	}
}

async function attackAreaProximity(enemy, area) {
	for (let e of enemy){
		if(abs(e.x - area.x) < 18 ){
			await e.changeAni(['death','dead'])
			e.remove();		
		}
	}
}

//Check when enemy is close enought to chase player
function chaseCheck() {
	switch (currentMap) {
		case "forest":
			enemyProximity(fly, fly.speed);
			enemyProximity(leaf, leaf.speed);
	}
}

