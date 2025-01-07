/**
 * The pixel size of each tile | 16x16
 * @type {number}
 */
let tileSize = 16;

/**
 * Sets up the environment for the current map by defining various tiles and objects such as platforms,
 * spawn points, enemy spanwers, and coins. It also assigns sprites and animations for different tile types.
 * This function initializes myTiles and walkable tiles.
 * 
 * @function setEnviroment
 * @param {Object} tileSet - The tile set used to create the environment for the level (e.g., forest, mountain).
 * @returns {void} Does not return a value.
 * 
 * @see {@link myTiles} For the group that holds all tile-related objects in the environment.
 * @see {@link walkableTiles} For the collection of tiles the player can walk on.
 * @see {@link spawnPoint} For the initial spawn point of the player.
 * @see {@link enemySpawn1} For the spawn point of the first type of enemy.
 * @see {@link enemySpawn2} For the spawn point of the second type of enemy.
 * 
 * @example
 * //Group Properties Explanation
 * 
 *group = new Group() 									 '(No parent group)'
 * 	group = new myTiles.Group() | walkableTiles.Group(); '(Determines which subgroup the group belongs)'
 *	group.layer = 'number'; 							 '(Determines the layer of a Sprite in case of overlapping)'
 *	group.collider = 'static'; 							 '(Determines sprite collider('none', 'static', 'kinematic'))'
 *	group.w = tileSize; 								 '(Sprite width)'
 *	group.h = tileSize; 								 '(Sprite Height)'
 *	group.tile = 'character'; 							 '(Determines which character the sprite represents in the tile map)'
 *	group.addAni({  									 '(Determines which part of the spritesheet is corresponds to the Sprite)'
 *		w: tileSize,
 *		h: tileSize,
 *		row: 0,
 *		col: 0
 *	});
 */
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

		finaleTrigger = new Group();
		finaleTrigger.layer = 3;
		finaleTrigger.collider = 'static';
		finaleTrigger.w = 1;
		finaleTrigger.h = 1;
		finaleTrigger.tile = 'T';
		finaleTrigger.visible = false;
		finaleTrigger.overlaps(allSprites);

}
//Updates the tileset image
//All the tiles have to be reset with addAni()

/**
 * Updates the tileset image used for all the tile images
 * Here addAni adds a single frame animation to each tile
 * For the tile images to update on map change
 * the animation need to be reassigned
 * @function updateTileset
 * @param {q5.Image} set The tileset image of the current map
 * @see {@link changeLevel} For function implementation
 * @see https://p5play.org/docs/Sprite.html#addAni for addAni documentayion
 */
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