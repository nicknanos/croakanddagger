//Set Variables
let gameState = "runGame";

let mapGravity = 10;

//Level Creation
let levels = [];
let currentMap = 'forest'
let currentLevel = 0;
//Map Tiles
let tileGroup;
let myTiles;
//Only Walkable Tiles
let walkableTiles;
let spawnPoint, endPoint;

//reset level helper
let allSpritesGroup;


let activePlayer;

//Checks to see if player is in a movement sequence (prevents sequence cancellation)
let inSequence = false;

//Player Sensors
let groundSensor,leftSensor,rightSensor,topSensor, cameraSensor;

let score = 0;

//Enviroment
let coins, ground, underGround, platform, spikes
let coinsImg

//Movement helpers
let blocking = false
let direction = 0;

//Attack capability flag
let attackTimer;
let canAttack  = true;
let attackSpeed = 300//ms

let damageTimer;
let canDamage  = true;
let prevFrame = 0

//getting chased flag(prevens enemy animation overlap)
let chasing = false;

//Sprites and Assets
let hero, partner, witch, lizard, portal, hex, frog, enemies, fly, leaf;
let heroImg, partnerImg, witchImg, lizardImg, portalImg, hexImg, frogImg, cloudImg, flyImg, leafImg;

let forestTiles, mountainTiles;

//let cloudX = 0;

//Intro Scene
let floor, waitingRoom;
let backgroundImg;

//Sounds
let forestMusic, coinSound, damageSound, defeatSound;

//ui
let ui, heart
let heartImg

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

let mountainBackground = [
	{
		file: './assets/backgrounds/mountain/sky.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: './assets/backgrounds/mountain/city.png',
		img: undefined,
		x: 0,
		speed: 0.2	
	},
	{
		file: './assets/backgrounds/mountain/mountain1.png',
		img: undefined,
		x: 0,
		speed: 0.4
	},
	{
		file: './assets/backgrounds/mountain/mountain2.png',
		img: undefined,
		x: 0,
		speed: 0.6
	},
	{
		file: './assets/backgrounds/mountain/mountain3.png',
		img: undefined,
		x: 0,
		speed: 0.7
	}
]

let test

//Preload assets
function preload() {
	for (let b of forestBackground){
		b.img = loadImage(`${b.file}`)
	}

	for (let b of mountainBackground){
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

	forestTiles = loadImage('./assets/enviroment/forestTiles2.png');
	mountainTiles = loadImage('./assets/enviroment/mountainTiles.png');
	coinsImg = loadImage('./assets/enviroment/coin.png');
	flyImg = loadImage('./assets/enemies/forest/fly.png');
	leafImg = loadImage('./assets/enemies/forest/leaf.png');

	forestMusic = loadSound('./assets/sound/forest.ogg');
	coinSound = loadSound('./assets/sound/coin.wav');
	damageSound = loadSound('./assets/sound/damage.wav');
	damageSound.setVolume(.5)
	defeatSound = loadSound('./assets/sound/enemy-defeat.wav');
	defeatSound.setVolume(1);


	heartImg = loadImage('./assets/ui/heart.png');


	initializeEnemies();
}
//let cube 
function setup() {
	allSpritesGroup = new Group();
	//SetUp Canvas
    canvasSetup()
	world.gravity.y = mapGravity;
	allSprites.pixelPerfect = true;
	preloadLevels();

	//Eniroment (tiles, objects etx)
	setEnviroment(forestTiles);
	changeLevel();

	spawnLizard(spawner().x,spawner().y);
	activePlayer = lizard;
	activePlayer.overlaps(coins);	

	//UI
	ui = new Group();
	for (let i = 0; i < lizard.maxHealth; i++) {
		heart = new ui.Sprite(30 + i * 40, 25, 19, 18, 'n');
		heart.spriteSheet = heartImg;
		heart.addAnis({
			full: { row: 0, frames: 1, frameSize: [19,18]},
			empty: { row: 1, frames: 1, frameSize: [19,18]}
		});
		heart.changeAni('full')
	}

	spawnEnemies(fly, leaf);
}
function update() {
	clear();
	if(gameState=='runGame'){
		//Background
		displayBackground(forestBackground);
		//Player Controlls
		gameControlls (activePlayer);
		//Camera Controlls
		cameraControll(activePlayer, tileGroup, 4);
		//Die on spikes
		if(groundSensor.overlaps(spikes)) {
			death();
			damageSound.play(); 
		}
		//Change to next level
		if(lizard.overlaps(endPoint)) endLevel();
		//collect coins
		lizard.overlaps(coins)
		keepScore();
		
		//Check when enemy is close enought to chase player
		enemyProximity();
		//Background Music
		backgroundMusic(.2);
		//check if player gets damaged
		if(enemies.overlapping(lizard)&&canDamage) {
			console.log('DAMAGE');
			
			damage();
		}
		if (frameCount-prevFrame > 100){
			lizard.opacity = 1
			prevFrame = frameCount
		}
		//Debug Mode
		gameDebug(true);		
	}
}

//Draws elements ignoring camera controll
function drawFrame() {
	camera.off();
	ui.color = 'orange';
	for (let i = 0; i < 9; i++) {
		if (kb[i + 1]) ui[i].color = 'red';
	}
	ui.draw();
}

//keyboard/controller controlls
function gameControlls(character){	
	//----------Controls----------\\
	if((character.currentState != character.states.ATTACK) && (character.currentState != character.states.BLOCK) && !inSequence){
		stuckCheck();
		if (kb.pressing('left')|| contro.leftStick.x < -0.25) {
			character.mirror.x = true;
			character.changeAni('run');
			if(character.currentState == character.states.STUCK){
				character.vel.x = 0;
				if(rightSensor.overlapping(walkableTiles)){
					character.vel.x = -playerSpeed;
					changeState('WALK')
				}
			}else{
				character.vel.x = -playerSpeed;
				changeState('WALK')
				direction = -1;
			}
		}

		else if ((kb.pressing('right')|| contro.leftStick.x > 0.25)){
			character.mirror.x = false;
			character.changeAni('run');
			if(character.currentState == character.states.STUCK){
				character.vel.x = 0;
				if(leftSensor.overlapping(walkableTiles)){	
					character.vel.x = playerSpeed;
					changeState('WALK');
					
				}
			}else{
				character.vel.x = playerSpeed;
				changeState('WALK');	
				direction = 1;
			}
		}
		else if (kb.released('right')||kb.released('left')){
			character.changeAni('stand');
			character.vel.x = 0;
			changeState('IDLE')
		}
		if (isOnGround()){
			if(kb.presses('up')){
				world.gravity.y = 15;
				character.vel.y = -3.5;
				//character.changeAni(['jump','stand']);
				world.gravity.y = 10;
			}
		}
	}
	if(kb.presses('e')){
		if(canAttack) atttack(character);
	}
	if(kb.presses('q')){
		block();
	}
	if(kb.released('q')){
		releaseBlock();
	}
	
}

//resets player to starting position
function resetplayer(resetCamera){
	lizard.health = lizard.maxHealth;
	for (h of ui) h.changeAni('full')
    lizard.speed = 0;
    lizard.rotationSpeed = 0;
    lizard.rotation = 0;
    lizard.x = spawner().x;
    lizard.y = spawner().y;
	//Reset camera sensor if needed
	if (resetCamera) {
		cameraSensor.x  = lizard.x;
		cameraSensor.y  = lizard.y;
	}
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
//	else if (kb.released('`')){
//		allSprites.debug = false;
//		textSize(0)
//	}
}

//Attack action
async function atttack(character) {
	canAttack = false;
	character.vel.x = 0;
	changeState('ATTACK')
	let attackArea = new Sprite((character.x+(8)*direction), (character.y), 25, 20) //creates an invisible sprite in front of player
	attackArea.visible = false;
	attackArea.mass = 0.0;
	character.overlaps(attackArea);                                               //
	attackArea.overlaps(allSprites);                                           	  //
	let area =  new GlueJoint(character, attackArea);                             //
	area.visible = false;                                                         //
	await character.changeAni('slash'); //plays attack animation
	character.changeAni('stand');       //
	changeState('IDLE')
	await attackAreaProximity(attackArea);      //
	attackArea.remove(); //removes sprite after attackends
	attackTimer = setInterval(()=>{
		canAttack = true
		console.log('attack')
		clearInterval(attackTimer);
		attackTimer = undefined;
	}, attackSpeed)
}

//Block action(hold)
let blockingArea;
function block(){
	lizard.vel.x = 0;
	changeState('BLOCK')
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
	changeState('IDLE');
	blocking = false;
}

//helper function: Grabs and returns coordinates from spawnPoint tile
function spawner(){
	return {x: spawnPoint[0].position.x+24, y: spawnPoint[0].position.y-5};
}

//check if player touches a ground surface
function isOnGround() {
	return  groundSensor.overlapping(ground)||
			groundSensor.overlapping(platform)||
			groundSensor.overlapping(cornerR)||
			groundSensor.overlapping(cornerL)
}

//play death animation and reset player
async function death() {
	inSequence = true;
	lizard.opacity = 1;
	lizard.vel.x = 0;
	await lizard.changeAni(['death','dead']);
	resetplayer(resetCamera =false);
	lizard.changeAni('stand')
	inSequence = false;
}

//checks for coin collection and updates score
function keepScore() {
	for (let c of coins){
		if (lizard.overlaps(c)){
			coinSound.play();
			c.remove();
			score++;
			if(lizard.health<lizard.maxHealth){
				ui[lizard.health].changeAni('full');
				lizard.health++;
			}
		}
	}
}

//Checks if attack hits an enemy
// checks if enemy x cord is close enought to the attack area sprite x cord
// this is used beacause attackArea.overlaps(enemy) doesnt work, even thought it should
async function attackAreaProximity(area) {
	for (let e of enemies){
		if(abs(e.x - area.x) < 18 && abs(e.y - area.y) < 18){
			canDamage = false;
			defeatSound.play();
			await e.changeAni(['death','dead'])
			chasing = false;
			e.vel.x = 0;
			e.vel.y = 0;
			e.speed = 0;
			e.remove();	
			canDamage = true;
		}
	}
}

//Plays background music according to level
function backgroundMusic(volume){
	switch(currentMap){
		case 'forest':
			forestMusic.play();
			forestMusic.setVolume(volume);
			break;
		case 'mountain':
			break;
		case 'castle':
			break;
		case 'boss':
			break;
	}
}

//Handles reaching the end of current leve;
async function endLevel() {
	inSequence = true;
	await lizard.changeAni('run');
	await lizard.move(160, 'right', 1);
	console.log('wait')
	changeLevel();
	lizard.changeAni('stand');
	inSequence = false;
}
function damage() {
	lizard.opacity = 0.4;
	damageSound.play();
	shake(lizard);
	console.log(frameCount-prevFrame);
	canDamage = false;
	ui[lizard.health-1].changeAni('empty');
	lizard.health--;
	if(lizard.health==0) death();
	damageTimer = setInterval(()=>{
		canDamage = true
		clearInterval(damageTimer);
		damageTimer = undefined;
	}, 2000)
}
//shakes sprite
async function shake(entity){
	await entity.move(15, 'left',  1);
	await entity.move(5, 'right', 1);

}

function spawnEnemies(enemy1, enemy2){
	for(e1 of enemySpawn1){
		 e = new enemy1.Sprite(e1.position.x, e1.position.y)
	}
	for(e2 of enemySpawn2){
		e = new enemy2.Sprite(e2.position.x, e2.position.y)
   }
}

