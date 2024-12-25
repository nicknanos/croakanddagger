// Forest Enemies \\
    //Fly
function initializeEnemies(){
	enemies = new Group();

    fly = new enemies.Group();
	fly.w = 20;
	fly.h = 20;
	fly.collider = 'none'
	fly.layer = 5;
	fly.rotationLock = 'true';
	fly.spriteSheet = flyImg;
	fly.speed = 0.01;
	fly.friction = 0;
	fly.anis.w=32;
	fly.anis.h=32;
	fly.addAnis({
		move: { row: 0, frames: 4, frameDelay: 10 },
		attack: { row: 2, frames: 4, frameDelay: 13 },
        death: { row: 3, frames: 6, frameDelay: 10},
        dead: { row: 5, frames: 0}
	});

    for(f of fly) f.changeAni('move');


    leaf = new enemies.Group();
	leaf.w = 12;
	leaf.h = 12;
	leaf.layer = 5;
	leaf.rotationLock = 'true';
	leaf.spriteSheet = leafImg;
	leaf.speed = 0.01;
	leaf.friction = 0;
	leaf.anis.w= 32;
	leaf.anis.h= 32;
	leaf.anis.offset.x = 2;
	leaf.anis.offset.y = -8;
	leaf.addAnis({
		move: { row: 1, frames: 5, frameDelay: 10 },
		attack: { row: 5, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 7, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(l of leaf) l.changeAni('move');
}

function enemyProximity(enemy, speed) {
	for(e of enemy){
		if ((abs(activePlayer.x - e.x))<100 && (abs(activePlayer.y - e.y))<100){
			if((activePlayer.x - e.x)<0) e.mirror.x = true; else e.mirror.x = false;
			e.moveTowards(activePlayer, speed)
		}
	}
}