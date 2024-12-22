//sets spawn point on current level
function setSpawn(){

}

//generates current level
function levelGenerator(){


}

function changeLevel(){
    //Remove Previous Level(Removes all sprites except player and sensors)
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
        //New Level Tiles
        tileGroup = new Tiles(levels[currentLevel].platforms, 0, 0, ground.w, ground.h);
        //Make deep copy of the tilegroup class instance
        walkable = Object.create(Object.getPrototypeOf(tileGroup), Object.getOwnPropertyDescriptors(tileGroup));
        
        for (let t of tileGroup){
            if(t.isWalkable == undefined){
                walkable.splice(walkable.indexOf(t),1)
            }
        }
        //Change coin color
        for(let c of coins) c.changeAni(currentMap);
        //update map name
        currentMap = levels[currentLevel].map;
        //reste player to spawn point
        if(currentLevel>0) resetplayer(resetCamera = true);
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
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................c............rbbbbbbbb",
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
        level: 0    
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
            "bbbbbbbbl......................................rbbbbbbbb",
            "bbbbbbbbl.........................c............rbbbbbbbb",
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
    
    currentLevel = levels[0].level;
}