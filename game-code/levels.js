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
            allSprites[i] != cameraSensor &&
            allSprites[i] != leftSensor &&
            allSprites[i] != rightSensor &&
            allSprites[i] != topSensor

        ) {
            allSpritesGroup.add(allSprites[i]);
        }
    }
    allSpritesGroup.removeAll();
    //Create new level
        //Changes which tileset is used depnding on the level
//        if(currentLevel == 0){
//            //setEnviroment(forestTiles);
//        }else if(levels[currentLevel].map != levels[currentLevel - 1].map){ //Checks if the current level is different than the previous one
//            console.log(levels[currentLevel].map)
//            switch(levels[currentLevel].map){
//                case 'forest':
//	                myTiles.spriteSheet = forestTiles;
//                    break;
//                case 'mountain':
//                    console.log('in')
//                    myTiles.spriteSheet = mountainTiles;
//                    myTiles.draw()
//                case 'castle':
//                    //ADD CASTLE TILES
//                    break;
//            }
//        }

        //New Level Tiles
        tileGroup = new Tiles(levels[currentLevel].platforms, 0, 0, ground.w, ground.h);
        //Make deep copy of the tilegroup class instance
        //walkable = Object.create(Object.getPrototypeOf(tileGroup), Object.getOwnPropertyDescriptors(tileGroup));
        //
        //for (let t of tileGroup){
        //    if(t.isWalkable == undefined){
        //        walkable.splice(walkable.indexOf(t),1)
        //    }
        //}
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
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................................................",
"........................................................................................................................................................................................................................g...............................",
"...............................................................................................1......c........................................c.......................................................................<b...............................",
".....................................................................................................ff..............................fffffff...ffff..............................................................f....<bb...............................",
"..........................................................................................fffffffff.................................................f................................................................<bbb..ffff.........................",
"..................................................1..........................................................................................................................................................f......<bbbb...............................",
"................................................................c.......................f.........................................c..................f...............1..........f....................c.............<bbbbb........ffff...................",
"......c...................................<g>.......f..........fff......................................fff.......................f......................g...g...............g.....g.............ffffffff.........<bbbbbb...............................",
"......f..............................fff..rbl..f.......f..<g>.......................fff...........................................1.....................<b...b>.............<b.....b>............................<bbbbbbb..............fff..............",
".........fffff...............f.<g>........rbl.....f.......rbl......f.........................................f.........................................<bb...bb>...........<bb.....bb>..........................<bbbbbbbb...............................",
"...............................rbb>.......rbl.............rbl....................f................c...................f.......f...f...f...............<bbb...bbb>.........<bbb.....bbb>........................<bbbbbbbbb...............................",
"................<gg>.......ff..rbbb>......................rbl.......................f............c.c.................................................<bbbb...bbbb>.......<bbbb.....bbbb>......................<bbbbbbbbbb...............................",
"..S......E......rbbl.........2.rbbbb>............2....2...rbl.............................2..g......................................................<bbbbbnnnbbbbb>.....<bbbbbnnnnnbbbbb>....................<bbbbbbbbbbb...............................",
"ggggggggggggggggbbbbgggggggggggbbbbbbgggggggggggggggggggggbbbgggggggggggg...gggggggggggggggggbggg...ggggggggggggggggggggggggggggggggggggggggggggggggbbbbbbgggbbbbbbgggggbbbbbbbbbbbbbbbbbggggggggggggggggggggbbbbbbbbbbbbggggggggggggggggggggggggggggggg",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnnnbbbbbbbbbbbbbbbbbbbbbnnnbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ],
        map: "forest",
        level: 0
    });
    levels.push({
        platforms: [
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b................................................",
            "b........................<ggg>...................",
            "b.....c....................rbl...................",
            "b.....ff...................rbl...................",
            "b................................................",
            "b........fffff......<>...........................",
            "bg>.............1...rb>...<gg>..<>...............",
            "bbl.............<>..rbl..<bbbbggbl...............",
            "bbl....S........rlnnbbbnnbbbbbbbbl....E..........",
            "bbl....gggggggggbbbbbbbbbbbbbbbbbbggggggggggggggg",
            "bbbnnnnbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "b................................................",
        ],
        map: "mountain",
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
        level: 2
    });
    
    currentLevel = levels[0].level;
}