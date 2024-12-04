let hero, floor, test;


//function setup(){
//    canvasSetup();
//
//}
//
//function preload(){
//
//}
//
//function draw(){
//    clear();
//}

function preload() {
	spawnHero();

}

function setup() {
    canvasSetup()
	world.gravity.y = 10;
	allSprites.pixelPerfect = true;

	floor = new Sprite(canvas.hw,canvas.hh, canvas.w, 3, 's');
	floor.color = color(133, 22, 62);

	//practice();

}

function draw() {
	clear();
    background('cyan');
	if (hero.y>900) resetplayer();

	//hero.debug = mouse.pressing();
	hero.debug = true;

//----------Controls----------\\
if (kb.pressing('left')|| contro.leftStick.x < -0.25) {
	hero.vel.x = -3;
	hero.mirror.x = true;
	hero.changeAni('run');
}

else if ((kb.pressing('right')|| contro.leftStick.x > 0.25)){
	hero.vel.x = 3;
	hero.changeAni('run');
	hero.mirror.x = false;

}
else if (kb.released('right')||kb.released('left')){
	hero.changeAni('stand');
	hero.vel.x = 0;
}

if(kb.presses('up')){
	hero.vel.y = -2
	hero.changeAni(['jump','stand'])
}


cameraControll();
}


function resetplayer(){
    hero.speed = 0;
    hero.rotationSpeed = 0;
    hero.rotation = 0;
    hero.y = 350;
    hero.x = 105;
}

async function practice() {
	await hero.changeAni('slashUp');
	hero.changeAni('run');
	hero.mirror.x = true;
	await hero.move(60, 180, 1);
	hero.speed = 0;

	await hero.changeAni('slashDown');
	hero.changeAni('roll');
	hero.ani.frame = 1;
	hero.mirror.x = false;
	await hero.move(60, 0, 1);
	hero.speed = 0;

	practice();
}