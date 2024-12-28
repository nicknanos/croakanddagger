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