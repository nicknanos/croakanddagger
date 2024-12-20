const backgroundColor = '#1f1f1f'
let cWidth,cHeight,fScale

//Initialize Canvas
function canvasSetup() {
    fScale = 4;
    cWidth = Math.floor(320*fScale)
    cHeight = Math.floor(190*fScale)

    //new Canvas(928, 793,"pixelated");
    
    new Canvas(cWidth,cHeight,"pixelated");
    document.body.style.backgroundColor = color(backgroundColor);
  }

  function cameraControll(player,map, zoom) {
   //     //camera follows active player
    //camera.x =  lizard.x;
    //camera.y = lizard.y - 50;
    //camera.x = cameraSensor.x;
    //camera.y = cameraSensor.y -50;

    constrainCamera(player,map);
    cameraSensor.moveTowards(player, 0.07)
    camera.zoom = zoom;

  }
  //Displays parallax background
  function displayBackground(level) {
    switch (level) {
      case 'forest':
        for (b of forestBackground){
          image(b.img, int(b.x), 0, canvas.w, canvas.h);
          image(b.img, int(b.x)+ width, 0, canvas.w, canvas.h); // draw background to the right of the base one || int() resolves seams between 
          image(b.img, int(b.x)- width, 0, canvas.w, canvas.h); // draw background to the left of the base one  || the instances of the background
          if (activePlayer.currentState == activePlayer.states.WALK) b.x -= b.speed*direction+1*direction;
          //if (direction != 0) b.x -= b.speed*direction+1*direction;
          if (b.x < -width) b.x = 0;
          }
          //permanent cloud
          image(cloudImg, cloudX, 0, canvas.w, canvas.h);
          image(cloudImg, int(cloudX) + width, 0, canvas.w, canvas.h);
          if (cloudX < -width) cloudX = 0;
          cloudX -= 0.11;
    }
  }

  //Sets limits for the camera
  function constrainCamera(player, tileGroup){
   //X Axi
   let firstX = spawner().x;                             //x cord of spawner tile
   let lastX = tileGroup[tileGroup.length-1].position.x; //x cord of last tile in map
   camera.x = constrain(cameraSensor.x, firstX, lastX);
   //Y Axis
   let firstY = tileGroup[0].position.y;                 //y cord of first tile in map
   let lastY = tileGroup[tileGroup.length-1].position.y; //y cord of last tile in map
   camera.y = constrain(cameraSensor.y-30, cameraSensor.y-200, lastY);
   //camera.y = player.y
  }


  function updateCameraY(){
    
   // //IMPLEMENT AFTER GROUNDSENSOR
   // if(isOnGround()){
   //   let difference = activePlayer.y - spawner().y;
   //   if (difference < 0) {
   //      //camera.y -= difference/5;
   //     // camera.moveTo(camera.x, camera.y-=difference/2, 0.1)
   //   }
   // }
    
  }