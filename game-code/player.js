const playerSpeed = 1.2;

function spawnHero(){
    hero = new Sprite(90, 500);
	hero.w=20;
	hero.h=18;
	hero.layer = 5;
	hero.rotationLock = 'true';
	hero.spriteSheet = heroImg;
    //hero.scale =1;

    hero.addCollider(0,10,hero.w,3)

	hero.anis.offset.x = 1.2;
	hero.anis.offset.y = -1;
	hero.anis.frameDelay = 6;
	hero.friction = 0;
	hero.anis.w=32;
	hero.anis.h=32;

	hero.addAnis({
		run: { row: 1, frames: 8 },
		jump: { row: 5, frames: 6, frameDelay:5 },
		roll: { row: 2, frames: 5, frameDelay: 14 },
		turn: { row: 3, frames: 7 },
		stand: { row: 0, frames: 13, frameDelay:10 },
		slashUp: { row: 10, frames: 10 },
		slashDown: { row: 11, frames: 10 }
	});
	hero.changeAni('stand');
}

function spawnLizard(x,y){
    lizard = new Sprite(x, y);
	lizard.w=15;
	lizard.h=24;
	lizard.layer = 5;
	lizard.rotationLock = 'true';
	lizard.spriteSheet = lizardImg;
    //lizard.scale =1;

	//lizard.addCollider(0,10,lizard.w,3);

	lizard.anis.offset.x = 0;
	lizard.anis.offset.y = 1.5;
	lizard.anis.frameDelay = 6;
	lizard.friction = 0;
	lizard.anis.w=64;
	lizard.anis.h=64;

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
	leftSensor.x = lizard.x - 10;
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
	rightSensor.x = lizard.x + 10;
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

//Checks if player is pushing against a platform
//Used to prevent sprite bouncing and to controll the moving background
function stuckCheck() {
	if(leftSensor.overlapping(walkable) || rightSensor.overlapping(walkable)){
		changeState('STUCK')
	}
	else if(!(leftSensor.overlapping(walkable) && rightSensor.overlapping(walkable))){
		changeState('IDLE')
	}
}
