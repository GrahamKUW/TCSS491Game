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


/**
 * Attempts to load the level with the passed reference name.
 * @param {*} levelReference the name of the level to load
 */
function loadLevel(levelReference = "prototype_level") {
    switch (levelReference) {
        case "prototype_level":
            loadPrototypeLevel();
            break;
        case "level_1":
            loadLevel1();
            break;
        case "level_2":
            loadLevel2();
            break;
        default:
            console.warn("Could not find a matching levelReference when trying to load level: " +
                levelReference +
                "\nLoading Prototype Level instead");
            loadPrototypeLevel();
    }

}


function loadPrototypeLevel() {
    console.log("Loading prototype level!");
    gameEngine.entities = []; // clear out all entities
    constructTilemap(gameEngine, "prototype_level", "./assets/sprites/StatueCatsTileset.png", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y)
    // Create level collider
    constructColliders(gameEngine, "prototype_level", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    constructHazards(gameEngine, "prototype_level", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
    //console.log(getTileMapObjects("prototype_level", GAMEOBJECT_LAYER));
    constructGameObjects(gameEngine, "prototype_level", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    //extra entities that arent in the tiled data currently
    //gameEngine.addEntity(createExitDoor(950, 250, "PrototypeExit"));
}

function loadLevel1() {
    console.log("Loading level 1!");
    gameEngine.entities = []; // clear out all entities
    constructTilemap(gameEngine, "level_1", "./assets/sprites/StatueCatsTileset.png", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y)
    // Create level collider
    constructColliders(gameEngine, "level_1", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    constructHazards(gameEngine, "level_1", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
    //console.log(getTileMapObjects("prototype_level", GAMEOBJECT_LAYER));
    constructGameObjects(gameEngine, "level_1", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    //extra entities that arent in the tiled data currently
    //gameEngine.addEntity(createExitDoor(950, 250, "PrototypeExit"));
}

function loadLevel2() {
    console.log("Loading level 2!");
    gameEngine.entities = []; // clear out all entities
    constructTilemap(gameEngine, "level_2", "./assets/sprites/StatueCatsTileset.png", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y)
    // Create level collider
    constructColliders(gameEngine, "level_2", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    constructHazards(gameEngine, "level_2", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
    //console.log(getTileMapObjects("prototype_level", GAMEOBJECT_LAYER));
    constructGameObjects(gameEngine, "level_2", TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

    //extra entities that arent in the tiled data currently
    //gameEngine.addEntity(createExitDoor(950, 250, "PrototypeExit"));
}