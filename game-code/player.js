function spawnHero(){
    hero = new Sprite(90, 350);
	hero.w=10;
	hero.h=12;
	hero.rotationLock = 'true';
	hero.spriteSheet = './assets/hero.png';
    //hero.scale =1;

    hero.addCollider(0,4,6)

	hero.anis.offset.x = 1.2;
	hero.anis.offset.y = 0.7;
	hero.anis.frameDelay = 6;
	hero.friction = 0;
	hero.anis.w=32;
	hero.anis.h=32;

	hero.addAnis({
		run: { row: 1, frames: 8 },
		jump: { row: 0, frames: 6, frameDelay:5 },
		roll: { row: 2, frames: 5, frameDelay: 14 },
		turn: { row: 3, frames: 7 },
		stand: { row: 0, frames: 2, frameDelay:40 },
		slashUp: { row: 10, frames: 10 },
		slashDown: { row: 11, frames: 10 }
	});
	hero.changeAni('stand');
}