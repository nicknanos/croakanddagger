function spawnPortal(x, y){
    portal = new Sprite(x, y);
	portal.w=2;
	portal.h=12;
	portal.layer = 5;
	portal.rotationLock = 'true';
	portal.spriteSheet = portalImg;
    //portal.scale =1;

    //portal.addCollider(0,4,6)

	portal.anis.offset.x = 1.2;
	portal.anis.offset.y = -20;
	portal.anis.frameDelay = 6;
	portal.friction = 0;
	portal.anis.w=64;
	portal.anis.h=64;

	portal.addAnis({
		open: { row: 1, frames: 8 },
		active: { row: 0, frames: 8, frameDelay:7 },
		close: { row: 2, frames: 8, frameDelay: 7 },
	});
	portal.changeAni('active');
}

function spawnHex(x, y) {
    hex = new Sprite(x, y);
    hex.w = hero.w;
    hex.h = hero.h;
    hex.layer = 6
    hex.rotationLock = true;
    hex.spriteSheet = hexImg;
    hex.friction = 0;
    hex.anis.w = 32;
    hex.anis.h = 32;
    hex.anis.offset.y = -2;
	hex.frameDelay = 5;

    hex.addAnis({
        cast: { row: 0, frames: 1},
		fly: { row: 1, frames: 1},
		explode: {row: 2, frames: 2, frameDelay: 30}  		
    });
	hex.changeAni(['cast'])


}
let tileSize = 16;
function setEnviroment(tileSet){
		myTiles = new Group()
		myTiles.spriteSheet = tileSet;

		//current level spawn point
		spawnPoint = new myTiles.Group();
		spawnPoint.layer = 3;
		spawnPoint.collider = 'static';
		spawnPoint.w = 1;
		spawnPoint.h = 1;
		spawnPoint.tile = 'S';
		spawnPoint.visible = false;
		spawnPoint.overlaps(allSprites);


		//current level end point
		endPoint = new myTiles.Group();
		endPoint.layer = 3;
		endPoint.collider = 'static';
		endPoint.w = 3;
		endPoint.h = 3;
		endPoint.tile = 'E';
		endPoint.visible = false;
		endPoint.overlaps(allSprites);



		//coins
		coins  = new myTiles.Group();
		coins.layer = 5;
		coins.collider = 'static';
		coins.w = 18;
		coins.h = 18;
		coins.tile = 'c';
		//coins.overlaps(activePlayer);
		coins.overlaps(enemies);
		coins.spriteSheet = coinsImg;
		coins.anis.offset.y = -2;
		coins.scale = 0.7;
		coins.addAnis({
			mountain: {row: 2, frames: 7, frameSize: [18,18], frameDelay: 8},
			forest: {row: 1, frames: 7, frameSize: [18,18], frameDelay: 8},
			castle: {row: 0, frames: 7, frameSize: [18,18], frameDelay: 8},
			entrance: {row: 0, frames: 7, frameSize: [18,18], frameDelay: 8},
			bossRoom: {row: 0, frames: 7, frameSize: [18,18], frameDelay: 8}

		})
		
		walkableTiles = new myTiles.Group();

		//ground
		ground = new walkableTiles.Group();
		ground.layer = 1;
		ground.collider = 'static';
		ground.w = tileSize;
		ground.h = tileSize;
		ground.tile = 'g';
		ground.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 0
		});

		//ground left wall
		groundL = new walkableTiles.Group();
		groundL.layer = 1;
		groundL.collider = 'static';
		groundL.w = tileSize;
		groundL.h = tileSize;
		groundL.tile = 'l';
		groundL.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 3
		});
		groundL.isWalkable =true;

		//ground right wall
		groundR = new walkableTiles.Group();
		groundR.layer = 1;
		groundR.collider = 'static';
		groundR.w = tileSize;
		groundR.h = tileSize;
		groundR.tile = 'r';
		groundR.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 4
		});
		groundR.isWalkable = true;


		//ground right corner
		cornerR = new walkableTiles.Group();
		cornerR.layer = 1;
		cornerR.collider = 'static';
		cornerR.w = tileSize;
		cornerR.h = tileSize;
		cornerR.tile = '>';
		cornerR.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 6
		});
		cornerR.isWalkable = true;

		cornerL = new walkableTiles.Group();
		cornerL.layer = 1;
		cornerL.collider = 'static';
		cornerL.w = tileSize;
		cornerL.h = tileSize;
		cornerL.tile = '<';
		cornerL.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 5
		});
		cornerL.isWalkable = true;

		topBlock = new walkableTiles.Group();
		topBlock.layer = 1;
		topBlock.collider = 'static';
		topBlock.w = tileSize;
		topBlock.h = tileSize;
		topBlock.tile = 't';
		topBlock.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 7
		});
		topBlock.isWalkable = true;

		//underground
		underGround = new walkableTiles.Group();
		underGround.layer = 1;
		underGround.collider = 'static';
		underGround.w = tileSize;
		underGround.h = tileSize;
		underGround.tile = 'b';
		underGround.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 1
		});
		underGround.isWalkable = true;

		//floating platforms
		platform = new walkableTiles.Group();
		platform.layer = 2;
		platform.collider = 'static';
		platform.w = tileSize;
		platform.h = tileSize;
		platform.tile = 'f';
		platform.addAni({
			w: tileSize,
			h: tileSize,
			row: 0,
			col: 2
		});
		platform.isWalkable = true;

		//spikes
		spikes = new walkableTiles.Group();
		spikes.layer = 1;
		spikes.collider = 'static';
		spikes.w = tileSize;
		spikes.h = tileSize;
		spikes.tile = 'n';
		spikes.addAni({
			w: tileSize,
			h: tileSize,
			row: 1,
			col: 0
		});

		//spawn point for first kind of enemy
		enemySpawn1 = new myTiles.Group();
		enemySpawn1.layer = 3;
		enemySpawn1.collider = 'static';
		enemySpawn1.w = 1;
		enemySpawn1.h = 1;
		enemySpawn1.tile = '1';
		enemySpawn1.visible = false;
		enemySpawn1.overlaps(allSprites);

		//spawn point for second kind of enemy
		enemySpawn2 = new Group();
		enemySpawn2.layer = 3;
		enemySpawn2.collider = 'static';
		enemySpawn2.w = 1;
		enemySpawn2.h = 1;
		enemySpawn2.tile = '2';
		enemySpawn2.visible = false;
		enemySpawn2.overlaps(allSprites);

		//Invisible colliding block
		invBlock = new myTiles.Group();
		invBlock.layer = 3;
		invBlock.collider = 'static';
		invBlock.w = tileSize;
		invBlock.h = tileSize;
		invBlock.tile = 'i';
		invBlock.visible = false;

		bossSpawner = new Group();
		bossSpawner.layer = 3;
		bossSpawner.collider = 'static';
		bossSpawner.w = 1;
		bossSpawner.h = 1;
		bossSpawner.tile = 'B';
		bossSpawner.visible = false;
		bossSpawner.overlaps(allSprites);

}
//Updates the tileset image
//All the tiles have to be reset with addAni()
function updateTileset(set){
	myTiles.spriteSheet = set;
	ground.addAni({w: tileSize, h: tileSize, row: 0, col: 0});
	groundL.addAni({w: tileSize, h: tileSize, row: 0, col: 3});
	groundR.addAni({w: tileSize, h: tileSize, row: 0, col: 4});
	cornerR.addAni({w: tileSize, h: tileSize, row: 0, col: 6});
	cornerL.addAni({w: tileSize, h: tileSize, row: 0, col: 5});
	topBlock.addAni({w: tileSize, h: tileSize, row: 0, col: 7});
	underGround.addAni({w: tileSize, h: tileSize, row: 0, col: 1});
	platform.addAni({w: tileSize, h: tileSize, row: 0, col: 2});
	spikes.addAni({w: tileSize, h: tileSize, row: 1, col: 0});
}