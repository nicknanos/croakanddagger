const backgroundColor = '#1f1f1f'
let cWidth,cHeight,fScale

//Initialize Canvas
function canvasSetup() {
    fScale = 4;
    cWidth = Math.floor(320*fScale)
    cHeight = Math.floor(190*fScale)

    new Canvas(cWidth,cHeight,"pixelated");
    document.body.style.backgroundColor = color(backgroundColor);
  }

  function cameraControll() {
    camera.x = hero.x;
    camera.zoom = 10;
    
  }