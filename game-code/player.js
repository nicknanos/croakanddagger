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
	lizard.w=20;
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
	groundSensor.w = lizard.w-5;
	groundSensor.h = 5;
	groundSensor.x = lizard.x;
	groundSensor.y = lizard.y + lizard.h/2 + 2;
	groundSensor.mass = 0.0;
	groundSensor.collider = 'none';
	groundSensor.visible = false;
	groundSensor.overlaps(allSprites);
	g = new GlueJoint(lizard, groundSensor);
	g.visible = false

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
		BLOCK: 4
	};
	lizard.currentState = lizard.states.IDLE;
}

