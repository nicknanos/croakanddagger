/**
 * Color of the background color of the document body (Area outside of canvas)
 * @type {string}
 */
const backgroundColor = '#1f1f1f'

/**
 * Canvas width and height
 * @type {number}
 */
let cWidth,cHeight;

/**
 * Canvas scale
 * @type {number}
 */
let fScale;

/**
 * Y coordinate offset for the camera location
 * @type {number}
 */
let cameraYOffset;

/**
 * Sets up the canvas for the game by defining its scale and dimensions
 * The 'pixelated' attribute sets pixelDensity to 1 
 * and various css styles are applied to the canvas to make it render without image smoothing
 * 
 * @function canvasSetup
 * @returns {void} 
 * 
 * @see https://q5js.org/learn/#createCanvas For the createCanvas documentations
 * @see https://p5play.org/docs/p5play.js.html#line9287 for documentayion
 */
function canvasSetup() {
    fScale = 4;
    cWidth = Math.floor(320*fScale)
    cHeight = Math.floor(190*fScale)
    
    createCanvas(cWidth,cHeight,"pixelated");
    document.body.style.backgroundColor = color(backgroundColor);
  }

/**
 * Controls the camera's movement and zoom level based on the player's position.
 * The camera is follownig the camera sensor, a sprite following the player with 
 * a speed lower than the player speed 
 * 
 * @function cameraControll
 * @param {Sprite} player - The player sprite, used to determine the cameraSensors's target.
 * @param {Tiles} map - The map tiles or that define the camera's constraints.
 * @param {number} zoom - The zoom level to set for the camera.
 * @returns {void} Does not return a value.
 * 
 * @see {@link constrainCamera} For constraining the camera within the map's boundaries.
 * @see {@link spawnLizard} For detecting the camera's position and smoothly moving it towards the player.
 * @see https://p5play.org/docs/Camera.html For the camera object documentaion
 */
function cameraControll(player,map, zoom) {
    constrainCamera(map);
    cameraSensor.moveTowards(player, 0.07)
    camera.zoom = zoom;

  }

 /**
 * Displays a parallax background based on the current map.
 * The background image is chosen according to the current map, and it is drawn
 * multiple times to create a scrolling effect. The background scrolls horizontally
 * when the player is walking, unless the map is "entrance" or "bossRoom".
 * 
 * @function displayBackground
 * @returns {void}
 * 
 * @see {@link currentMap} For the current map, which determines the background to display.
 * @see {@link changeState} For the player states
 * @see {@link direction} For the direction in which the background scrolls.
 */
  function displayBackground() {
    switch(currentMap){
      case 'forest':
        level = forestBackground;
        break;
      case 'mountain':
        level = mountainBackground;
        break;
      case 'entrance':
        level = entranceBackground;
        break;
      case 'castle':
        level = castleBackground;
        break;
      case 'bossRoom':
        level = bossBackground;
        break;
    }
    for (b of level){
      image(b.img, int(b.x), 0, canvas.w, canvas.h);
      image(b.img, int(b.x)+ width, 0, canvas.w, canvas.h); // draw background to the right of the base one || int() resolves seams between 
      image(b.img, int(b.x)- width, 0, canvas.w, canvas.h); // draw background to the left of the base one  || the instances of the background
      if (lizard.currentState == lizard.states.WALK && currentMap != "entrance" && currentMap != 'bossRoom') b.x -= b.speed*direction+1*direction;
      if (b.x < -width) b.x = 0;
      }
  }

  /**
 * Constrains the camera's position to ensure it stays within the boundaries of the level.
 * The camera's x and y coordinates are adjusted based on the player's position and
 * the defined limits for the map. The function ensures that the camera does not go
 * outside the designated area of the level, both horizontally and vertically.
 * 
 * The horizontal borders boundaries are determined by the x coordinates of
 * the spawn point and the end point
 * 
 * The vertical borders boundaries are determined by the y coordinates of
 * the cameraSensor and the last(lowest) tile
 * 
 * 
 * @function constrainCamera
 * @param {Array} tileGroup - The group of tiles for the current level, used to calculate
 *                             the vertical bounds of the camera.
 * @returns {void} 
 * 
 * @see {@link cameraControll} For the camera sensor logic
 */
  function constrainCamera(tileGroup){
   //X Axi
   let firstX = spawner().x + 30;                             //x cord of spawner tile
   let lastX = endPoint[0].position.x -30
   camera.x = constrain(cameraSensor.x, firstX, lastX);
   //Y Axis
   let firstY = tileGroup[0].position.y;                 //y cord of first tile in map
   let lastY = tileGroup[tileGroup.length-1].position.y; //y cord of last tile in map
   cameraYOffset = 30;
   if(currentMap=="entrance") cameraYOffset = 70;
   camera.y = constrain(cameraSensor.y-cameraYOffset, cameraSensor.y-200, lastY);
  }