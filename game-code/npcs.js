//------Partner------\\
function spawnPartner(x,y){
    partner = new Sprite(x, y);
	partner.w=20;
	partner.h=18;
	partner.layer = 4;
	partner.rotationLock = 'true';
	partner.spriteSheet = partnerImg;
    //partner.scale =1;

    partner.addCollider(0,10,6)

	partner.anis.offset.x = 1.2;
	partner.anis.offset.y = -1;
	partner.anis.frameDelay = 6;
	partner.friction = 0;
	partner.anis.w=32;
	partner.anis.h=32;

	partner.addAnis({
		run: { row: 1, frames: 8 },
		jump: { row: 0, frames: 6, frameDelay:5 },
		roll: { row: 2, frames: 5, frameDelay: 14 },
		turn: { row: 3, frames: 7 },
		stand: { row: 0, frames: 2, frameDelay:30 },
		slashUp: { row: 10, frames: 10 },
		slashDown: { row: 11, frames: 10 }
	});
	partner.changeAni('stand');
}

	//-------Frog---------\\
	function spawnFrog(x, y){
		frog = new Sprite(x, y);
		frog.w = 10;
		frog.h = 10;
		frog.layer = 5;
		frog.rotationLock = true;
		frog.friction = 0;
		frog.addCollider(0,4,6)


		frog.spriteSheet = frogImg;
		frog.anis.offset.x = 0;
		frog.anis.offset.y = -6;
		frog.anis.frameDelay = 6;
		frog.anis.w=32;
		frog.anis.h=32;

		
		frog.addAnis({
			stand: { row: 0, frames: 5 },
			move: { row: 1, frames: 6, frameDelay:5 },
			jump: { row: 2, frames: 5, frameDelay: 10 }
		});
		frog.changeAni('stand');

	}



//------Witch------\\

function spawnwitch(x,y){
    witch = new Sprite(x, y);
	witch.w = 24;
	witch.h = 24;
	witch.layer = 5;
	witch.rotationLock = 'true';
	witch.spriteSheet = witchImg;
    //witch.scale =1;

    witch.addCollider(0,10,6)

	witch.anis.offset.x = 1.2;
	witch.anis.offset.y = -1;
	witch.anis.frameDelay = 6;
	witch.friction = 0;
	witch.anis.w=32;
	witch.anis.h=32;

	witch.addAnis({
		run: { row: 1, frames: 8 },
		stand: { row: 0, frames: 4, frameDelay: 10 },
        hex: { row: 2, frames: 8, frameDelay: 10},
        death: { row: 4, frames: 10, frameDelay: 10},
        fly: { row: 5, frames: 4, frameDelay: 10},
        hit: { row: 3, frames: 4, frameDelay: 10}
	});
	witch.changeAni('stand');
}