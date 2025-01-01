// Forest Enemies \\
    //Fly
function initializeEnemies(){
	enemies = new Group();

    fly = new enemies.Group();
	fly.w = 8;
	fly.h = 8;
	fly.collider = 'none'
	fly.flying = true;
	fly.layer = 5;
	fly.rotationLock = 'true';
	fly.spriteSheet = flyImg;
	fly.speed = 0.01;
	fly.friction = 0;
	fly.anis.w = 32;
	fly.anis.h = 32;
	fly.scale = 1.5;
	fly.addAnis({
		stand: { row: 0, frames: 4, frameDelay: 10 },
		move: { row: 0, frames: 4, frameDelay: 10 },
		attack: { row: 2, frames: 4, frameDelay: 13 },
        death: { row: 3, frames: 6, frameDelay: 10},
        dead: { row: 5, frames: 0}
	});

    for(f of fly) f.changeAni('stand');


    leaf = new enemies.Group();
	leaf.w = 5;
	leaf.h = 5;
	leaf.layer = 5;
	leaf.flying = false;
	leaf.rotationLock = 'true';
	leaf.spriteSheet = leafImg;
	leaf.mass = 100;
	leaf.speed = 0.01;
	leaf.friction = 0;
	leaf.anis.w= 32;
	leaf.anis.h= 32;
	leaf.scale = 1.5;
	leaf.anis.offset.x = 1;
	leaf.anis.offset.y = -4.5;
	leaf.addAnis({
		stand: { row: 0, frames: 5, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		attack: { row: 5, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 7, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(l of leaf) l.changeAni('stand');

	bat = new enemies.Group();
	bat.w = 5;
	bat.h = 5;
	bat.layer = 5;
	bat.collider = 'none'
	bat.flying = true;
	bat.rotationLock = 'true';
	bat.spriteSheet = batImg;
	bat.speed = 0.01;
	bat.friction = 0;
	bat.anis.w= 16;
	bat.anis.h= 16;
	bat.scale = 2;
	bat.anis.offset.x = 1;
	bat.anis.offset.y = -4.5;
	bat.addAnis({
		stand: { row: 0, frames: 5, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		attack: { row: 5, frames: 6, frameDelay: 13 },
        death: { row: 2, frames: 5, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(b of bat) b.changeAni('stand');

	cobra = new enemies.Group();
	cobra.w = 9;
	cobra.h = 7;
	cobra.layer = 5;
	cobra.flying = false;
	cobra.rotationLock = 'true';
	cobra.spriteSheet = cobraImg;
	cobra.mass = 100;
	cobra.speed = 0.01;
	cobra.friction = 0;
	cobra.anis.w= 32;
	cobra.anis.h= 16;
	cobra.scale = 2;
	cobra.anis.offset.x = 2;
	cobra.anis.offset.y = 0;
	cobra.addAnis({
		stand: { row: 0, frames: 8, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 3, frames: 8, frameDelay: 13 },
        death: { row: 2, frames: 8, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(c of cobra) c.changeAni('stand');

	ghoul = new enemies.Group();
	ghoul.w = 6;
	ghoul.h = 10;
	ghoul.layer = 5;
	ghoul.flying = false;
	ghoul.rotationLock = 'true';
	ghoul.spriteSheet = ghoulImg;
	ghoul.mass = 100;
	ghoul.speed = 0.015;
	ghoul.friction = 0;
	ghoul.anis.w= 32;
	ghoul.anis.h= 32;
	ghoul.scale = 1.7;
	ghoul.anis.offset.x = 0;
	ghoul.anis.offset.y = -2.4;
	ghoul.addAnis({
		stand: { row: 0, frames: 4, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 2, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 6, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(g of ghoul) g.changeAni('stand');

	imp = new enemies.Group();
	imp.w = 6;
	imp.h = 6;
	imp.layer = 5;
	imp.flying = false;
	imp.rotationLock = 'true';
	imp.spriteSheet = impImg;
	imp.mass = 100;
	imp.speed = 0.01;
	imp.friction = 0;
	imp.anis.w= 32;
	imp.anis.h= 32;
	imp.scale = 2;
	imp.anis.offset.x = 0;
	imp.anis.offset.y = -4.5;
	imp.addAnis({
		stand: { row: 0, frames: 7, frameDelay: 10 },
		move: { row: 1, frames: 8, frameDelay: 10 },
		attack: { row: 2, frames: 6, frameDelay: 13 },
        death: { row: 4, frames: 6, frameDelay: 10},
        dead: { row: 20, frames: 0}
	});

    for(i of imp) i.changeAni('stand');

	boss = new Group();
	boss.w = 10;
	boss.h = 15;
	boss.rotationLock = 'false';
	boss.spriteSheet = bossImg;
	boss.friction = 0;
	boss.speed = 0.01;
	boss.health  = 5;
	boss.anis.w = 64;
	boss.anis.h = 64;
	boss.anis.offset.x = 0;
	boss.anis.offset.y = 0;
	boss.addAnis({
		stand: { row: 0, frames: 3, frameDelay: 10 },
		move: { row: 1, frames: 5, frameDelay: 10 },
		damage: { row: 6, frames: 4, frameDelay: 10 },
		bounceU: {row: 9, frames: 5, frameDelay: 10},
		bounceD: {row: 10, frames: 6, frameDelay: 10},
        death: { row: 7, frames: 10, frameDelay: 10},
        dead: { row: 20, frames: 0}
	})
    for(b of boss) b.changeAni('stand');

}

//Constantly checks if enemy is near player
let enemyCurrentY
function enemyProximity() {
	for(e of enemies){
		if ((abs(activePlayer.x - e.x))<100 && (abs(activePlayer.y - e.y))<100){		//Checks distance
			if((activePlayer.x - e.x)<0){ //fixes enemy orientation
				e.mirror.x = true;
				e.dir = 1;
			}else{
				e.mirror.x = false;
				e.dir = -1;
				}	
			if(!chasing){				//At the moment of chasing grabs enemy Y and changes to movement animation
				enemyCurrentY = e.y
				e.changeAni('move');
				chasing = true;
			}			
			if(((e.y - enemyCurrentY) > 0.5 || (e.y - enemyCurrentY) < -0.5)&& !e.flying ) {	//Updates Y cord in case enemy falls to lower level
				enemyCurrentY = e.y;
				e.applyForceScaled(0, 50)	//Pushes enemy down
			} else e.mass = 0	//Pushes enemy down
			if(e.flying){	//Flying enemies move freely
				e.moveTowards(activePlayer, e.groups[2].speed)	
			}else{		//Walking enemies move only on the X axis
				e.moveTowards(activePlayer.x - (20*e.dir),enemyCurrentY, e.groups[2].speed)	
			}
		}
	}
}