//Set Variables

/**
 * Current game state
 * @type {string} */
let gameState = "menu";

/**
 * World gravity value
 * @type {number} */
let mapGravity = 10;


/**
 * @typedef {Object} Level
 * @property {string} platforms  // The tile layout of the level
 * @property {string} map 		// The map of the level
 * @property {number} level     //Number of the level
 */

/**
 * Array of game levels
 * @type {Array.<Level>}
* @see {@link preloadLevels} for usage
* @see https://p5play.org/learn/tiles.html?page=0 for Tile documentation
 * */
let levels = [];

/**
 * Current game map
 * @type {string} */
let currentMap = 'forest'

/**
 * Current game level
 * @type {number} */
let currentLevel = 0;


//Map Tiles
/**
 * Group of all the tiles of the current level
 * Utilizes p5play's 'Tiles' class for handling tile generation.
 * @type {Tiles}
 * @see https://p5play.org/learn/tiles.html?page=0 for Tile examples
 * @see https://p5play.org/docs/Tiles.html For Tile class source code
 * @see {@link changeLevel} for utilization
 */
let tileGroup;

/**
 * Parent group for all the Sprite groups that build the level tiles
 * Utilizes p5play's 'Group' class for handling collections of sprites.
 * @see https://p5play.org/learn/group.html for Group examples
 * @see https://p5play.org/docs/Group.html for Group class source code
 * @see {@link setEnviroment} for utilization
 * @type {Group}
 */
let myTiles;

/**
 * A subset of `myTiles` containing only walkable tiles.
 * Represents areas the player can move on.
 * @type {Group}
 * @see {@link myTiles} For the parent group of all tiles.
 * @see {@link setEnviroment} for initialization
 */
let walkableTiles;

/**
 * A subset of `myTiles` containing the spawn and level end point Groups.
 * Only one Sprite of each groupe is used per level to declare its starting and end point
 * @type {Group}
 * @see {@link myTiles} For the parent group of all tiles.
 * @see {@link setEnviroment} for initialization
 */
let spawnPoint, endPoint;

/**
 * A helper group  used to remove all unwanted Sprites from previous level
 * @type {Group}
 * @see {@link changeLevel} for utilization
 */
let allSpritesGroup;

/**
 *Checks to see if player is in a movement sequence (prevents sequence cancellation)
 * @type {boolean}
 */
let inSequence = false;

/**
 * Sprites attached to the player, used as "sensors"
 * @type {Sprite}
 * @see {@link spawnLizard} for initialization
 */
let groundSensor,leftSensor,rightSensor, cameraSensor;

/**
 * Sprites attached to the top of the player, used as "sensor"
 * @type {Sprite}
 * @see {@link spawnLizard} for initialization
 * @deprecated to be removed
 */
let topSensor;

/**
 * Keeps track of score (number of coins collected)
 * @type {number}
 * @see {@link keepScore} for usage
 */
let score = 0;

//Enviroment
/**
 * Children Sprite Groups of my myTiles Group
 * Each Group has multuple instances(Sprites) on each level
 * @type {Group}
 * @see {@link myTiles}
 */
let coins, ground, groundL, groundR, invBlock, topBlock, underGround, platform, spikes;

/**
 * Animation spritesheet for the collecatble coins
 * Different animations are used in each level
 * @type {q5.Image}
 */
let coinsImg;

/**
 * Used to indicate player direction
 * Takes values of 1 or -1
 * @type {number}
 * @see {@link gameControlls}
 */
let direction = 0;

/**
 * Timer ID for managing attack intervals.
 * @type {number}
 * @see {@link attack}
 */
let attackTimer;

/**
 * Flag indicating when a character can attack
 * @type {boolean}
 * @see {@link attack}
 */
let canAttack  = true;

/**
 * Indicates the time between player attacks
 * @type {number}
 * @see {@link attack}
 */
let attackSpeed = 300//ms

/**
 * Timer ID for managing damge taking intervals.
 * @type {number}
 * @see {@link damage}
 */
let damageTimer;

/**
 * Flag indicating when a character can get damaged
 * @type {boolean}
 * @see {@link damage}
 */
let canDamage  = true;

/**
 * Stores the frame of the time of an attack
 * Used to calculate when the players sprite opacity returns to normal
 * @type {number}
 * @see {@link damage}
 * @see {@link runGame}
 */
let prevFrame = 0

/**
 * Flag indicating when the player's getting chased by an enemy(prevens enemy animation overlap)
 * @see {@link killEnemy}
 * 
 */
let chasing = false;

//Sprites and Assets

/**
 * Sprite groups for the player and the enemies
 * @type {Group}
 * @see {@link initializeEnemies}
 * @see {@link spawnLizard}
 */
let witch, lizard, frog, fly, leaf, bat, cobra, ghoul, imp, goblinKing;

/**
 * Animation spritesheets caontaining the animaations for the player and enemies
 * @type {q5.Image}
 * @see {@link preload}
 * @see https://q5js.org/learn/#loadImage for loadImage documantation
 */
let heroImg, partnerImg, witchImg, lizardImg, portalImg, hexImg, frogImg, cloudImg, flyImg, leafImg, batImg, cobraImg, ghoulImg, impImg, bossImg, bossAttackAreaImg;

/**
 * Parent group for all enemy groups
 * Used to acces all enemies from one place
 * @type {Group}
 * @see {@link initializeEnemies}
 */
let enemies;

/**
 * A subset of 'myTiles' used to determin the spawn coordinates for each enemy type
 * @type {Group}
 * @see {@link myTiles} For the parent group of all tiles.
 * @see {@link setEnviroment} for initialization
 */
let enemySpawn1, enemySpawn2

/**
 * An object containing enemy groups for different types of enemies.
 * Every map has its own two unique enemies
 * @type {{e1: Group | undefined, e2: Group | undefined}}
 * @see {@link changeLevel}
 */
let enemyGroup = {e1: undefined, e2: undefined}

/**
 * Conatins the single tile image sheets for each map
 * @type {q5.Image}
 */
let forestTiles, mountainTiles, castleTiles;

/**
 * Sprite Group specifically for the boss
 * Even if theres one boss, using a Group helps with spawning in the boss
 * @type {Group}
 * @see {@link initializeEnemies}
 */
let boss;

/**
 * Sprite representing the area that the bosses attack takes
 * Used to detect if the bosses attack hits the player
 * @type {Sprite}
 * @see {@link initializeBoss}
 */
let bossAttackArea;

//Sounds
/**
 * Sound files for background music and sound effects
 * @type {q5.Sound}
	* @see {@link preload}
 * @see https://q5js.org/learn/#loadSound for loadSound documantation
 */
let forestMusic, mountainMusic, entranceMusic, castleMusic, coinSound, damageSound, defeatSound, bossMusic, menuMusic, introMusic, outroMusic;

/**
 * Sprite Group used for the UI (Health bar)
 * @type {Group}
	* @see {@link setUI}
 */
let ui;

/**
 * Sprite belonging to ui group
 * Represents individual hearts(player hit points)
 * @type {Sprite}
 * @see {@link setUI}
 */
let heart;

/**
 * Image sprite sheet for the ui's hearts
 * @type {q5.Image}
 */
let heartImg

/**
 * Images for the main menu and Controlls page
 * @type {q5.Image}
 * @see {@link menu}
 */
let menuImg, controllsImg;


/**
 * @typedef backgroundLayer
 * @property {string} file         		// The file path to the background image.
 * @property {q5.Image | undefined} img // The q5.Image object for the layer, initially undefined.
 * @property {number} x      			// The x-coordinate of the background layer.
 * @property {number} speed          	// The scrolling speed of the background layer.
 */

/**
 * An array representing layers of the forest background for a parallax effect.
 * Each layer contains the file path to the image, an image object (assigned later), 
 * its x-coordinate, and its scrolling speed.
 * 
 * @type {Array<{backgroundLayer}>}
*/
let forestBackground = [
	{
		file: 'assets/Backgrounds/forest/1.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: 'assets/Backgrounds/forest/2.png',
		img: undefined,
		x: 0,
		speed: 0.2	
	},
	{
		file: 'assets/Backgrounds/forest/3.png',
		img: undefined,
		x: 0,
		speed: 0.4	
	},
	{
		file: 'assets/Backgrounds/forest/4.png',
		img: undefined,
		x: 0,
		speed: 0.6	
	}
];

/**
 * An array representing layers of the mountain background for a parallax effect.
 * Each layer contains the file path to the image, an image object (assigned later), 
 * its x-coordinate, and its scrolling speed.
 * 
* @type {Array<{backgroundLayer}>}
*/
let mountainBackground = [
	{
		file: 'assets/Backgrounds/mountain/sky.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: 'assets/Backgrounds/mountain/city.png',
		img: undefined,
		x: 0,
		speed: 0.2	
	},
	{
		file: 'assets/Backgrounds/mountain/mountain1.png',
		img: undefined,
		x: 0,
		speed: 0.4
	},
	{
		file: 'assets/Backgrounds/mountain/mountain2.png',
		img: undefined,
		x: 0,
		speed: 0.6
	},
	{
		file: 'assets/Backgrounds/mountain/mountain3.png',
		img: undefined,
		x: 0,
		speed: 0.7
	}
];

/**
 * An array representing layers of the entance background for a parallax effect.
 * Each layer contains the file path to the image, an image object (assigned later), 
 * its x-coordinate, and its scrolling speed.
 * 
* @type {Array<{backgroundLayer}>}
*/
let entranceBackground = [
	{
		file: 'assets/Backgrounds/entrance/1.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: 'assets/Backgrounds/entrance/2.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: 'assets/Backgrounds/entrance/3.png',
		img: undefined,
		x: 0,
		speed: 0
	},
	{
		file: 'assets/Backgrounds/entrance/4.png',
		img: undefined,
		x: 0,
		speed: 0
	},
	{
		file: 'assets/Backgrounds/entrance/5.png',
		img: undefined,
		x: 0,
		speed: 0
	}
];

/**
 * An array representing layers of the castle background for a parallax effect.
 * Each layer contains the file path to the image, an image object (assigned later), 
 * its x-coordinate, and its scrolling speed.
 * 
* @type {Array<{backgroundLayer}>}
*/
let castleBackground = [
	{
		file: 'assets/Backgrounds/castle/wall.png',
		img: undefined,
		x: 0,
		speed: 0	
	}
];

/**
 * An array representing layers of the boss room background for a parallax effect.
 * Each layer contains the file path to the image, an image object (assigned later), 
 * its x-coordinate, and its scrolling speed.
 * 
* @type {Array<{backgroundLayer}>}
*/
let bossBackground = [
	{
		file: 'assets/Backgrounds/boss/sky-full.png',
		img: undefined,
		x: 0,
		speed: 0	
	},
	{
		file: 'assets/Backgrounds/boss/mountain1-full.png',
		img: undefined,
		x: 0,
		speed: 0.2	
	},
	{
		file: 'assets/Backgrounds/boss/mountain2-full.png',
		img: undefined,
		x: 0,
		speed: 0.4
	},
	{
		file: 'assets/Backgrounds/boss/foreground.png',
		img: undefined,
		x: 0,
		speed: 0
	}
];

/**
 * @typedef storyScene
 * @property {string} file 				// The file path to the background image.
 * @property {q5.Image | undefined} img // The q5.Image object for the layer, initially undefined.
 */

/**
 * An array representing the intro story scenes. 
 * Each layer contains the file path to the image and  an image object (assigned later), 
 * 
 * @type {Array<{storyScene}>}
*/
let introScenes = [
	{
		file: 'assets/controlls.jpg',
		img: undefined,
	},
	{
		file: 'assets/intro/1.jpg',
		img: undefined,
	},
	{
		file: 'assets/intro/2.jpg',
		img: undefined,
	},
	{
		file: 'assets/intro/3.jpg',
		img: undefined,
	},
	{
		file: 'assets/intro/4.jpg',
		img: undefined,
	},
]

/**
 * An array representing the outro story scenes. 
 * Each layer contains the file path to the image and  an image object (assigned later), 
 * 
 * @type {Array<{storyScene}>}
*/
let outroScenes = [
	{
		file: 'assets/outro/1.jpg',
		img: undefined,
	},
	{
		file: 'assets/outro/2.jpg',
		img: undefined,
	},
	{
		file: 'assets/outro/3.jpg',
		img: undefined,
	},
	{
		file: 'assets/outro/4.jpg',
		img: undefined,
	},
	{
		file: 'assets/outro/5.jpg',
		img: undefined,
	},
]

/**
 * Represents the current story scene shown in the intro and outro of the game
 * @type {number}
 * @see {@link intro}
 * @see {@link endGame}
 */
let currentScene = 0;

/**
 * Q5 function that pre-loads assets before these are needed in the setup and update/draw function
 * @see https://q5js.org/learn/#preload for documentation
 */
function preload() {
	for (let b of forestBackground){
		b.img = loadImage(`${b.file}`)
	}

	for (let b of mountainBackground){
		b.img = loadImage(`${b.file}`)
	}

	for (let b of entranceBackground){
		b.img = loadImage(`${b.file}`)
	}

	castleBackground[0].img = loadImage(castleBackground[0].file)

	for (let b of bossBackground){
		b.img = loadImage(`${b.file}`)
	}

	for (let b of introScenes){
		b.img = loadImage(`${b.file}`)
	}

	for (let b of outroScenes){
		b.img = loadImage(`${b.file}`)
	}

	witchImg = loadImage('assets/boss/witch.png');
	lizardImg = loadImage('assets/player/lizard.png');
	frogImg = loadImage('assets/boss/frog.png');


	forestTiles = loadImage('assets/Enviroment/forestTiles2.png');
	mountainTiles = loadImage('assets/Enviroment/mountainTiles.png');
	castleTiles = loadImage('assets/Enviroment/castleTiles.png');
	coinsImg = loadImage('assets/Enviroment/coin.png');
	flyImg = loadImage('assets/enemies/forest/fly.png');
	leafImg = loadImage('assets/enemies/forest/leaf.png');
	batImg = loadImage('assets/enemies/mountain/bat.png');
	cobraImg = loadImage('assets/enemies/mountain/cobra.png');
	ghoulImg = loadImage('assets/enemies/castle/ghoul.png');
	impImg = loadImage('assets/enemies/castle/imp.png');
	bossImg = loadImage('assets/boss/goblin.png');
	bossAttackAreaImg = loadImage('assets/boss/bossAttack.png');


	forestMusic = loadSound('assets/sound/forest.ogg');
	mountainMusic = loadSound('assets/sound/mountain.ogg');
	entranceMusic = loadSound('assets/sound/entrance.ogg');
	castleMusic = loadSound('assets/sound/castle.ogg');
	bossMusic = loadSound('assets/sound/boss-music.ogg');
	coinSound = loadSound('assets/sound/coin.ogg');
	damageSound = loadSound('assets/sound/damage.ogg');
	damageSound.setVolume(.5)
	defeatSound = loadSound('assets/sound/enemy-defeat.ogg');
	defeatSound.setVolume(1);
	menuMusic = loadSound('assets/sound/menu.ogg');
	menuMusic.setVolume(.3);
	introMusic = loadSound('assets/sound/intro-music.ogg');
	introMusic.setVolume(.3);
	outroMusic = loadSound('assets/sound/outro-music.ogg');
	outroMusic.setVolume(.3);

	heartImg = loadImage('assets/ui/heart.png');
	menuImg = loadImage('assets/menu.jpg');
	controllsImg = loadImage('assets/controlls.jpg');

	initializeEnemies();
}


/**
 * Q5 function that runs one time when the program starts
 * Sets up the game environment, including canvas, sprites, levels, and UI elements.
 * Initializes global variables, loads resources, and prepares the game for play.
 * 
 * @function setup
 * @global
 * @returns {void} Does not return a value.
 * 
 * @see {@link canvasSetup} For the canvas initialization details.
 * @see {@link preloadLevels} For preloading all the level maps.
 * @see {@link changeLevel} For setting up the environment groups/tiles.
 * @see {@link spawnLizard} For creating the lizard(player) sprite function.
 * @see {@link setUI} For initializing the user interface.
 * @see {@link spawner} for determining the spanw point coordinates
 * @see https://q5js.org/learn/#setup for documantaion
 * @see https://p5play.org/docs/Sprite.html#pixelPerfect for pixelPerfect documanation
 */
function setup() {
	allSpritesGroup = new Group();
	world.gravity.y = mapGravity;
	allSprites.pixelPerfect = true; //The sprite will be drawn at integer coordinates, while retaining the precise position of its collider.
    canvasSetup() // sets up the canvas
	preloadLevels(); //load all level maps
	changeLevel(); // change level function, here it loads firt level
	spawnLizard(spawner().x,spawner().y); //spawns player at spawner tile coordinates
	lizard.overlaps(coins);	//Player can overlap coins, has to be declared here after player and enviroment initialization
	setUI(); //displays UI
}

/**
 * Q5 function that runs 60 times per second by default.
 * Acts as game state machine
 * 
 * @function update
 * @global
 * @returns {void} Does not return a value.
 * @see {@link menu} for the starting menu 
 * @see {@link intro} for the intro story
 * @see {@link runGame} for main game functionality
 * @see {@link endGame} for ending story
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Location/reload for location.reload documantation
 * */
function update() {
	clear();
	if(gameState=='menu') menu();
	if(gameState=='intro') intro();
	if(gameState=='runGame') runGame();
	if(gameState=='endGame') endGame();
	if(gameState=='replay') location.reload();
}

/**
 * Draws the UI after turning of the camera, making it static
 * @function drawFrame
 * @returns {void}
 * @see https://p5play.org/learn/camera.html?page=2 for camera.off explanation
 */
function drawFrame() {
	camera.off();
	ui.draw();
}

/**
 * Sets up the UI - Player Health
 * Creates heart sprites, same ammount as the players maxHealth property
 * @function setInput
 * @global
 * @return {void}
 */
function setUI(){
	ui = new Group();
	ui.isPerm = true; //Used to except UI from sprite resseting at changeLevel()
	ui.overlaps(allSprites);
	ui.layer = 100;
	for (let i = 0; i < lizard.maxHealth; i++) {
		heart = new ui.Sprite(30 + i * 40, 25, 19, 18, 'n');
		heart.spriteSheet = heartImg;
		heart.addAnis({
			full: { row: 0, frames: 1, frameSize: [19,18]},
			empty: { row: 1, frames: 1, frameSize: [19,18]}
		});
		heart.changeAni('full')
	}
}

/**
 * Displays main menu.
 * The first level is loaded in setup() but its turned invisible in the main menu
 * @function menu
 * @global
 * @returns {void}
 */
function menu(){
	mouse.visible = false;          
	menuMusic.play();				
	walkableTiles.visible = false;	//
	enemies.visible = false;		//
	lizard.visible  = false;		//Turns loaded first level invisible
	ui.visible      = false;		//
	coins.visible   = false;		//
	background(menuImg)
	textAlign(CENTER, MIDDLE);
	fill('white');
	textSize(30);
	text('Press "Space" to start',canvas.hw, canvas.hh+150)
	if(kb.presses('space')) gameState = 'intro';
}

/**
 * Displays the intro story scenes
 * Starts the game when the scenes end
 * @function intro
 * @global
 * @returns {void}
 */
function intro(){
	menuMusic.pause();
	introMusic.play();
	mouse.visible = true;
	if(currentScene<introScenes.length){
		background(introScenes[currentScene].img);
		if(mouse.pressed()) currentScene++;
	} else{
		currentScene = 0;
		gameState = 'runGame';
	} 
}

/**
 * Displays the outro story scenes
 * Has option to restart the game at last scene
 * @function endGame
 * @global
 * @returns {void}
 */
function endGame(){
	allSprites.remove();
	bossMusic.pause();
	outroMusic.play();
	mouse.visible = true;
	if(currentScene<outroScenes.length){
		background(outroScenes[currentScene].img);
		if(mouse.pressed()) ++currentScene;
	} else gameState = 'replay';
}

/**
 * Executes the main game loop, managing player interactions, camera controls, level transitions, 
 * enemy behavior, and game state logic. This function is called continuously to keep the game running.
 *
 * @function runGame
 * @global
 * @returns {void} Does not return a value.
 *
 * @see {@link displayBackground} For background rendering logic.
 * @see {@link gameControlls} For managing player input.
 * @see {@link cameraControll} For controlling the camera.
 * @see {@link enemyProximity} For enemy chase logic
 * @see {@link bossAI} For handling boss-specific behavior.
 * @see {@link endLevel} For transitioning to the next level.
 * @see {@link damage} For applying damage to the player.
 */
function runGame(){
	mouse.visible = false;
	introMusic.pause();

	walkableTiles.visible = true;	//
	enemies.visible = true;			//
	lizard.visible  = true;			// Makes first level visible again
	ui.visible      = true;			//
	coins.visible   = true;			//

	//Background
	displayBackground();

	//Player Controlls
	gameControlls (lizard);

	//Camera Controlls
	if(currentMap!='bossRoom'){
		cameraControll(lizard, tileGroup, 4);
		enemyProximity();
	}else {
		camera.x =spawner().x + 34;
		camera.y =spawner().y - 48;

		//Boss Fight Logic
		lizard.overlaps(goblinKing)
		bossAI();
		if(lizard.overlaps(finaleTrigger)&&deathTrigger) endLevel();

		//Final room logic
		if(currentLevel==7) { 
			witch.mirror.x = true;
			frog.mirror.x = true;
			if(lizard.overlaps(frog)) gameState = 'endGame'
		}

	}
	//Die on spikes
	if(groundSensor.overlaps(spikes)) {
		death();
		damageSound.play(); 
	}
	//Change to next level
	if(lizard.overlaps(endPoint)) endLevel();

	//Collect coins and keep Score
	keepScore();
	
	//Background Music
	backgroundMusic(volume = .2);

	//check if player gets damaged
	if(enemies.overlapping(lizard)&&canDamage) damage();

	//Resets player opacity after 100 frames pass from the time player gets damaged
	if (frameCount-prevFrame > 100){
		lizard.opacity = 1
		prevFrame = frameCount
	}

	//Debug Mode
	gameDebug(showSprites = true);	
}


/**
 * Manages character controls, including movement, jumping and attacking.
 * Handles input from the keyboard and controller, and updates the character's state and animation accordingly.
 *
 * @function gameControlls
 * @param {Sprite} character - The character sprite whose controls are being managed.
 * @returns {void} Does not return a value.
 * 
 * @see {@link stuckCheck} For handling scenarios where the character is stuck.
 * @see {@link changeState} For updating the character's state.
 * @see {@link isOnGround} For checking if the character is on the ground.
 * @see {@link attack} For handling attack actions.
 */
function gameControlls(character){	
	//----------Controls----------\\
	if((character.currentState != character.states.ATTACK) && !inSequence){
		stuckCheck();
		if (kb.pressing('left')|| contro.leftStick.x < -0.25) {
			character.mirror.x = true;
			character.changeAni('run');
			//If the character is stucks, dont let him move towards stuck area
			//Prevents player sprite from shaking
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
			//If the character is stucks, dont let him move towards stuck area
			//Prevents player sprite from shaking
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
			if(kb.presses('space')||kb.presses('up')){
				world.gravity.y = 15;
				character.vel.y = -3.5;
				world.gravity.y = 10;
			}
		}
	}
	if(kb.presses('e')){
		if(canAttack) attack(character);
	}
//	if(kb.presses('q')){
//		block();
//	}
//	if(kb.released('q')){
//		releaseBlock();
//	}
	
}


/**
 * Resets player back to spawning point
 * @function resetPlayer
 * @param {boolean} resetCamera Option to reset the camera | Avoid weird camera movements during level change
 * @param {boolean} resetHealth Option to reseet player health | Doesnt reset health on level change
 * @returns {void}
 * @see {@link spawner} For spawning coordinates
 */
function resetPlayer(resetCamera, resetHealth){
	if(resetHealth){
		lizard.health = lizard.maxHealth;
		for (h of ui) h.changeAni('full')
	}
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
		text(round(frameRate()), 50, 100); //displays frames per second
	}
//	else if (kb.released('`')){
//		allSprites.debug = false;
//		textSize(0)
//	}
}


/**
 * Executes an attack action for the given character. Creates an invisible attack area in front of the character,
 * plays the attack animation, and applies damage to enemies or the boss depending on the current level.
 * 
 * This function uses GlueJoint to attach the attack area sprite to the player
 * 
 * This function uses asynchronous operations to manage attack timing and resets the ability to attack after a cooldown period.
 * Using await the attack animation is completed before damage calculations take place
 * 
 * @async
 * @function attack
 * @param {Sprite} character - The character performing the attack.
 * @returns {Promise<void>} Resolves when the attack sequence is complete.
 * 
 * @see {@link changeState} For updating the character's state.
 * @see {@link attackAreaProximity} For handling proximity-based attack effects on regular enemies.
 * @see {@link damageBoss} For applying damage to the boss in level 6.
 * @see https://p5play.org/docs/GlueJoint.html for GlueJoint documentation
 * @see https://p5play.org/learn/animation.html?page=6 for using async/await for animation sequencing
 */
async function attack(character) {
	canAttack = false;
	character.vel.x = 0;
	changeState('ATTACK')
	let attackArea = new Sprite((character.x+(8)*direction), (character.y), 25, 20) //creates an invisible sprite in front of player
	attackArea.visible = false;
	attackArea.mass = 0.0;
	character.overlaps(attackArea);                                               
	attackArea.overlaps(allSprites);                                           	  
	let area =  new GlueJoint(character, attackArea); //Connects attack area to player
	area.visible = false;                                                         
	await character.changeAni('slash'); //plays attack animation
	character.changeAni('stand');       //
	changeState('IDLE')
	if(!(currentLevel == 6)){ //level 6 = boss fight room
		await attackAreaProximity(attackArea);
	}else{
		await damageBoss(attackArea);
	}
	attackArea.remove(); //removes attack sprite after attack ends
	attackTimer = setInterval(()=>{
		canAttack = true
		console.log('attack')
		clearInterval(attackTimer);
		attackTimer = undefined;
	}, attackSpeed)
}

/**
 * Determines and returns the spawn coordinates for the character.
 * Calculates the position based on the spawnPoint Sprite/Tile and adjusts the x and y coordinates for placement.
 * 
 * @function spawner
 * @returns {{x: number, y: number}} An object containing the x and y coordinates for the spawn point.
 * 
 * @see {@link spawnPoint} For the reference to the spawn point from which the coordinates are derived.
 */
function spawner(){
	return {x: spawnPoint[0].position.x+24, y: spawnPoint[0].position.y-5};
}

/**
 * Detects if the charater is on a Sprite/Tile that allows jumping
 * Prevents multiple jumps and jumping while touching the sides of walls
 * @function isOnGround
 * @returns {boolean}
 * @see {@link groundSensor}
 */
function isOnGround() {
	return  groundSensor.overlapping(ground)||
			groundSensor.overlapping(platform)||
			groundSensor.overlapping(cornerR)||
			groundSensor.overlapping(cornerL)||
			groundSensor.overlapping(invBlock)

}

/**
 * Plays dying animation and resets the player
 * @async
 * @function death
 * @returns {void}
 * @see {@link resetPlayer} for player reset
 * @see {@link inSequence} for its usage/logic
 */
async function death() {
	inSequence = true;
	lizard.opacity = 1;
	lizard.vel.x = 0;
	await lizard.changeAni(['death','dead']);
	resetPlayer(resetCamera =false, resetHealth = true);
	lizard.changeAni('stand')
	inSequence = false;
}

/**
 * Checks if player goes through a coin
 * The coin gets removed and the score updates
 * Collecting coins also heals the player
 * @function keepScore
 * @returns {void}
 */
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

/**
 * Checks if the attacking area overlaps an enemy
 * checks if enemy x cord is close enought to the attack area sprite x cord
 * Kills enemies hit
 * @function attackAreaProximity
 * @param {Sprite} area The attacking area created during an attack
 * @returns {void}
 * @see {@link attack} for attacking area creation
 * @see {@link killEnemy} for killing enemy logic
 */
function attackAreaProximity(area) {
	for (let e of enemies){
		if(abs(e.x - area.x) < 18 && abs(e.y - area.y) < 25){
			killEnemy(e)
		}
	}
}

/**
 * Cripples attacked enemy, plays its death animation and removes it
 * @function killEnemy
 * @param {Sprite} e The specific enemy that gets hit by the attack
 * @returns {void}
 * @see {@link attackAreaProximity} for attack detection
 */
async function killEnemy(e) {
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

/**
 * Plays background music according to level
 * Pauses previous level music and plays the current one
 * @function backgroundMusic
 * @param {number} volume The volume at which the background music is played
 * @returns {void}
 * @see {@link currentMap}
 */
function backgroundMusic(volume){
	switch(currentMap){
		case 'forest':
			forestMusic.play();
			forestMusic.setVolume(volume);
			break;
		case 'mountain':
			forestMusic.pause();
			mountainMusic.play();
			mountainMusic.setVolume(volume);
			break;
		case 'entrance':
			mountainMusic.pause();
			entranceMusic.play();
			entranceMusic.setVolume(volume);
			break;
		case 'castle':
			entranceMusic.pause();
			castleMusic.play();
			castleMusic.setVolume(volume);
			break;
		case 'bossRoom':
			castleMusic.pause();
			bossMusic.play();
			bossMusic.setVolume(volume);
			break;
	}
}

/**
 * Handles reaching the end of current level
 * The player moves to the right and the level changes
 * @function endLevel
 * @returns {void}
 * @see {@link changeLevel}
 */
async function endLevel() {
	inSequence = true;
	await lizard.changeAni('run');
	await lizard.move(160, 'right', 1);
	changeLevel();
	lizard.changeAni('stand');
	inSequence = false;
}

/**
 * Applies damage to the player. Reduces health, plays a damage sound, 
 * shakes the character, and updates the UI to reflect the change in health. 
 * The function also manages the cooldown for when the character can take damage again.
 *
 * @function damage
 * @returns {void}
 * 
 * @see {@link shake} For handling the player shake effect when the character takes damage.
 * @see {@link death} For triggering the death sequence when health reaches zero.
 */
function damage() {
	canDamage = false;
	lizard.opacity = 0.4;
	damageSound.play();
	shake(lizard);
	ui[lizard.health-1].changeAni('empty');
	lizard.health--;
	if(lizard.health==0) death();
	damageTimer = setInterval(()=>{
		canDamage = true
		clearInterval(damageTimer);
		damageTimer = undefined;
	}, 2000)
}

/**
 * Moves entity left and right
 * @async
 * @function shake
 * @param {Sprite} entity Sprite that the shake is applied to
 * @returns {void}
 */
async function shake(entity){
	await entity.move(15, 'left',  1);
	await entity.move(5, 'right', 1);
}

/**
 * Spawns enemies at predefined spawn points. This function creates enemy sprites for the specified enemies
 * and places them at the positions defined in `enemySpawn1` and `enemySpawn2`.
 * 
 * @function spawnEnemies
 * @param {Object} enemy1 - Spawner tile for the first enemy type
 * @param {Object} enemy2 - Spawner tile for the first enemy type
 * @returns {void} 
 * 
 * @see {@link enemySpawn1} For the first set of spawn points where enemy1 is placed.
 * @see {@link enemySpawn2} For the second set of spawn points where enemy2 is placed.
 */
function spawnEnemies(enemy1, enemy2){
	for(e1 of enemySpawn1){
		 e = new enemy1.Sprite(e1.position.x, e1.position.y)
	}
	for(e2 of enemySpawn2){
		e = new enemy2.Sprite(e2.position.x, e2.position.y)
   }
}

