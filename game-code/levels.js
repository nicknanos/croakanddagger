//sets spawn point on current level
function setSpawn(){

}

//generates current level
function levelGenerator(){


}

function changeLevel(){
    //Remove Previous Level
    for (let i = 0; i < allSprites.length; i++) {
        if (
            allSprites[i] != lizard &&
            allSprites[i] != groundSensor &&
            allSprites[i] != cameraSensor
        ) {
            allSpritesGroup.add(allSprites[i]);
        }
    }
    allSpritesGroup.removeAll();
    //Create new level
    group = new Tiles(levels[currentLevel].platforms, 0, 0, ground.w, ground.h);
    currentMap = levels[currentLevel].map;
    if(currentLevel>0) resetplayer();
    currentLevel++;
}

//preloads all the levels info
function preloadLevels() {
    levels.push({
        platforms: [
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................c............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................f............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl..........ff..........................rbbbbbbbb",
            "bbbbbbbbl.................fffffff..............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl........ffffff........................rbbbbbbbb",
            "bbbbbbbbl.......................................bbbbbbbb",
            "bbbbbbbbl.....ff................................bbbbbbbb",
            "bbbbbbbbl.......................................bbbbbbbb",
            "bbbbbbbblS.....................................Ebbbbbbbb",
            "bbbbbbbbbgggggggggggggg....gggggggggggggggggggggbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbnnnnbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "forest",
        level: 1    
    });
    levels.push({
        platforms: [
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................c............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................f............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl..........ff..........................rbbbbbbbb",
            "bbbbbbbbl.................fffffff..............rbbbbbbbb",
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl........ffffff........................rbbbbbbbb",
            "bbbbbbbbl.......................................bbbbbbbb",
            "bbbbbbbbl.....ff................................bbbbbbbb",
            "bbbbbbbbl.......................................bbbbbbbb",
            "bbbbbbbblS.....................................Ebbbbbbbb",
            "bbbbbbbbbgggggggggggggg....gggggggggggggggggggggbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbnnnnbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "forest",
        level: 1    
    });

}