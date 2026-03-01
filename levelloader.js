/**
 * This script loads levels based on the passed values by using the functions in the tiledimporter.js script. 
 * It really just bundles the construct calls to be accessed by the level reference for easier use with level transition components.
 * 
 */

const TILEMAP_POSITION_X = -400;
const TILEMAP_POSITION_Y = -168;
const TILEMAP_SCALE_X = 2;
const TILEMAP_SCALE_Y = 2;
//const LEVEL_REFERENCE = "prototype_level";
const LEVEL_REFERENCE = "level_2";

let CURRENT_LEVEL = "prototype_level";

let startingYarn = 0;

/**
 * Attempts to load the level with the passed reference name.
 * @param {*} levelReference the name of the level to load
 */
function loadLevel(levelReference = "prototype_level") {
    gameEngine.entities = []; // clear out all entities
    constructTilemap(gameEngine, levelReference, "./assets/sprites/StatueCatsTileset.png", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y)
    // Create level collider
    constructColliders(gameEngine, levelReference, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    constructHazards(gameEngine, levelReference, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
    //console.log(getTileMapObjects("prototype_level", GAMEOBJECT_LAYER));
    constructGameObjects(gameEngine, levelReference, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    CURRENT_LEVEL = levelReference;

    startingYarn = gameEngine.yarnCollected;
    //extra entities that arent in the tiled data currently
    
}

function reloadCurrentLevel(){
    //revert yarnCollected if collected before reloading
    if (startingYarn < gameEngine.yarnCollected) gameEngine.yarnCollected = startingYarn;

    console.log("Reloading: " + CURRENT_LEVEL);
    loadLevel(CURRENT_LEVEL);
}

function loadPrototypeLevel() {
    console.log("Loading prototype level!");
    loadLevel("prototype_level");
}

function loadLevel1() {
    console.log("Loading level 1!");
    loadLevel("level_1");
}

function loadLevel2() {
    console.log("Loading level 2!");
    loadLevel("level_2");
    
}

function loadLevel9() {
    console.log("Loading level 9!");
    loadLevel("level_9");
    
}

function loadLevel10() {
    console.log("Loading level 10!");
    loadLevel("level_10");
    
}

function loadLevel11() {
    console.log("Loading level 11!");
    loadLevel("level_11");
    
}

function loadLevel12() {
    console.log("Loading level 12!");
    loadLevel("level_12");
    
}

function loadLevel13() {
    console.log("Loading level 13!");
    loadLevel("level_13");
    
}