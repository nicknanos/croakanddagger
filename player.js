/**
 * The speed the player moves
 * @type {number}
 */
const playerSpeed = 1.2;


/**
 * Creates and initializes the lizard character sprite, including its size, animations, health, and various sensors 
 * that interact with the environment. The function sets up the lizard's appearance, behavior, and associated detection 
 * sensors to handle movement, collision, and state transitions during gameplay.
 * 
 * @function spawnLizard
 * @param {number} x - The x-coordinate for the lizard's spawn position.
 * @param {number} y - The y-coordinate for the lizard's spawn position.
 * @returns {void} Does not return a value.
 * 
 * @details
 * -**Ground Sensor**
 * -Sprite attached to bottom of player, used in @see{@link isOnGround}
 * -**Left/Right Sensors**
 * -Sprites attached in the left and right of the player used in @see stuckCheck
 * -**Top Sensor**
 * -Currently not in use
 * -**Camera Sensor**
 * - Floating Sprite on top of player used in @see {@link cameraControll}
 * 
 */
function spawnLizard(x,y){
    lizard = new Sprite(x, y);
	lizard.w=12;
	lizard.h=24;
	lizard.layer = 5;
	lizard.rotationLock = 'true';
	lizard.spriteSheet = lizardImg;
	lizard.anis.offset.x = 0;
	lizard.anis.offset.y = 1.5;
	lizard.anis.frameDelay = 6;
	lizard.friction = 0;
	lizard.anis.w=64;
	lizard.anis.h=64;
	lizard.maxHealth = 3;
	lizard.health = lizard.maxHealth;

	lizard.addAnis({
		run: { row: 1, frames: 8, frameDelay: 7 },
		jump: { row: 1, frames: 6, frameDelay:5 },
		hit: { row: 4, frames: 4, frameDelay: 14 },
		block: { row: 3, frames: 4 },
		blocking: { row: 6, frames: 1 },
		blockRelease: { row: 7, frames: 2, frameDelay:7 },
		stand: { row: 0, frames: 4, frameDelay:10 },
		slash: { row: 2, frames: 6 },
		death: { row: 5, frames: 5, frameDelay: 15},
		dead: { row: 8, frames: 1}
	});
	lizard.changeAni('stand');

	//Sensor Sprite to detect when the player touches the ground
	groundSensor = new Sprite();
	groundSensor.w = 15;
	groundSensor.h = 5;
	groundSensor.x = lizard.x;
	groundSensor.y = lizard.y + lizard.h/2 + 2;
	groundSensor.mass = 0.0;
	groundSensor.collider = 'none';
	groundSensor.visible = false;
	groundSensor.overlaps(allSprites);
	g = new GlueJoint(lizard, groundSensor);
	g.visible = false

	//Left side sensor
	leftSensor = new Sprite();
	leftSensor.w = 2;
	leftSensor.h = lizard.h - 3;
	leftSensor.x = lizard.x - 8;
	leftSensor.y = lizard.y;
	leftSensor.mass = 0.0;
	leftSensor.collider = 'none';
	leftSensor.visible = false;
	leftSensor.overlaps(allSprites);
	l = new GlueJoint(lizard, leftSensor);
	l.visible = false

	//Right side sensor
	rightSensor = new Sprite();
	rightSensor.w = 2;
	rightSensor.h = lizard.h - 3;
	rightSensor.x = lizard.x + 8;
	rightSensor.y = lizard.y;
	rightSensor.mass = 0.0;
	rightSensor.collider = 'none';
	rightSensor.visible = false;
	rightSensor.overlaps(allSprites);
	r = new GlueJoint(lizard, rightSensor);
	r.visible = false

	//Top side sensor
	topSensor = new Sprite();
	topSensor.w = 15;
	topSensor.h = 2;
	topSensor.x = lizard.x;
	topSensor.y = lizard.y - (lizard.h/2 + 0.5);
	topSensor.mass = 0.0;
	topSensor.collider = 'none';
	topSensor.visible = false;
	topSensor.overlaps(allSprites);
	t = new GlueJoint(lizard, topSensor);
	t.visible = false;


	cameraSensor = new Sprite();
	cameraSensor.w = 3;
	cameraSensor.h = 3;
	cameraSensor.x = lizard.x;
	cameraSensor.y = lizard.y;
	cameraSensor.collider ='none';
	cameraSensor.overlaps(allSprites);
	cameraSensor.visible = false;

	lizard.states = {
		IDLE: 0,
		WALK: 1,
		JUMP: 2,
		ATTACK: 3,
		BLOCK: 4,
		STUCK: 5
	};
	lizard.currentState = lizard.states.IDLE;
	lizard.prevState = lizard.states.IDLE;
}

/**
 * Changes the current state of the player.
 * The state transition is based on the provided state argument, which can either be a number or string representing 
 * the desired state.
 * 
 * @function changeState
 * @param {string|number} state - The new state to change the lizard to. This can be:
 *   - 'IDLE' or 0: Idle state.
 *   - 'WALK' or 1: Walking state.
 *   - 'JUMP' or 2: Jumping state.
 *   - 'ATTACK' or 3: Attacking state.
 *   - 'BLOCK' or 4: Blocking state.
 *   - 'STUCK' or 5: Stuck state.
 * 
 * @returns {void}
 * 
 * @see spawnLizard for state initialization
 */
function changeState(state) {
	lizard.prevState = lizard.currentState;	
	switch(state) {
		case 0:
		case 'IDLE':
			lizard.currentState = lizard.states.IDLE;
			break;
		case 1:
		case 'WALK':
			lizard.currentState = lizard.states.WALK;
			break;
		case 2:
		case 'JUMP':
			lizard.currentState = lizard.states.JUMP;
			break;
		case 3:
		case 'ATTACK':
			lizard.currentState = lizard.states.ATTACK;
			break;
		case 4:
		case 'BLOCK':
			lizard.currentState = lizard.states.BLOCK;
			break;
		case 5:
		case 'STUCK':
			lizard.currentState = lizard.states.STUCK;
			break;
	}
}


/**
 * Checks if the player is stuck by checking if either the left or right sensor
 * is overlapping with any walkable tiles. If the character is stuck, it changes the state to 'STUCK',
 * otherwise, it changes the state to 'IDLE'.
 * Used to prevent sprite bouncing and to controll the moving background
 * @function stuckCheck
 * @returns {void} 
 * 
 * @see spawnLizard for sensor initialization

 */
function stuckCheck() {
	if(leftSensor.overlapping(walkableTiles) || rightSensor.overlapping(walkableTiles)){
		changeState('STUCK')
	}
	else {
		changeState('IDLE')
	}
}
