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
    //extra entities that arent in the tiled data currently
    //gameEngine.addEntity(createExitDoor(950, 250, "PrototypeExit"));
}

function reloadCurrentLevel(){
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