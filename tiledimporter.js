const TILE_LAYER = 0;
const COLLISION_LAYER = 1;
const TRIGGER_LAYER = 2;
const HAZARD_LAYER = 3;
const GAME_OBJECT_LAYER = 4;




function mapSpriteToTilePalette(spriteComponent){
    
  const cellCountX = spriteComponent.image.width / spriteComponent.frameWidth;
  const cellCountY = spriteComponent.image.height / spriteComponent.frameHeight;

  // x and y are the cell image coordinate for that tile, index is the palette reference, so we can still only load a single palette
  // location is provided by tiled based on
  // tiled actually is index - 1 because we dont include background
  const size = cellCountX * cellCountY;

  console.log(size)
  const palette = new Array(size);

  let k = 0;
  for (let i = 0; i < cellCountY; i++) {
    for (let j = 0; j < cellCountX; j++) {
      palette[k] = { row: i, col: j };
      k++;
    }
  }

  return palette;
}

/**gets the tilemap from the global TileMaps object and returns easy to use data*/
function getTileMap(mapString = "prototype_level") {
  const map = TileMaps[mapString];

  if (map === null || map === undefined) {
    throw new Error(
      "Unable to reference TileMap: " + mapString + " there was an issue!",
    );
  }

  return {
    data: map.layers[TILE_LAYER].data,
    height: map.layers[TILE_LAYER].height,
    width: map.layers[TILE_LAYER].width,
  };
}

/**gets the colliders from the global TileMaps object and returns easy to use data*/
function getTileMapObjects(mapString = "prototype_level", index = 0) {
  const map = TileMaps[mapString];

  if (map === null || map === undefined) {
    throw new Error(
      "Unable to reference TileMap: " + mapString + " there was an issue!",
    );
  }

  return map.layers[index].objects;
}

function constructColliders(gameEngine, levelReference,tilemapX, tilemapY, tilemapScaleX, tilemapScaleY){
  const colliderData = getTileMapObjects(levelReference, COLLISION_LAYER);

	for (let i = 0; i < colliderData.length; i++) {
		const collider = colliderData[i]
    // real dimensions according to tilemap scaling
		const wallX = tilemapX + collider.x * tilemapScaleX;
		const wallY = tilemapY + collider.y * tilemapScaleY;
		const wallWidth = collider.width * tilemapScaleX;
		const wallHeight = collider.height * tilemapScaleY;

		gameEngine.addEntity(createWall(wallX,wallY,wallWidth, wallHeight ));
    
  	}
}

function constructTilemap(gameEngine, levelReference, paletteImage, tilemapX, tilemapY, tilemapScaleX, tilemapScaleY){
  const background = createTilemapBackground(paletteImage,tilemapX,tilemapY,  tilemapScaleX, tilemapScaleY);
	const palette = mapSpriteToTilePalette(background.sprite);
	const tilemap = getTileMap(levelReference); 
	background.sprite.tilemapData = {tilemap: tilemap, palette: palette};

  // store current tilemap in gameEngine.
  gameEngine.currentTilemap = tilemap;
  gameEngine.tilemapOffsetX = tilemapX;
  gameEngine.tilemapOffsetY = tilemapY;
  gameEngine.tilemapScaleX = tilemapScaleX;
  gameEngine.tilemapScaleY = tilemapScaleY;

	gameEngine.addEntity(background);
}

function constructTriggers(gameEngine, levelReference, tilemapX, tilemapY, tilemapScaleX, tilemapScaleY){

}

function constructHazards(gameEngine, levelReference, tilemapX, tilemapY, tilemapScaleX, tilemapScaleY){
  const gameObjectData = getTileMapObjects(levelReference, HAZARD_LAYER);

  for (let i = gameObjectData.length - 1; i > -1; i--) {
            const gameObject = gameObjectData[i];
            
            // real dimensions according to tilemap scaling
            const posX = tilemapX + gameObject.x * tilemapScaleX; 
            const posY = tilemapY + gameObject.y * tilemapScaleY;
            const width = gameObject.width * tilemapScaleX;
            const height = gameObject.height * tilemapScaleY;
        
            gameEngine.addEntity(createHazard(posX,posY,width, height ));
        } 
}

function constructGameObjects(gameEngine, levelReference, tilemapX, tilemapY, tilemapScaleX, tilemapScaleY){
  const gameObjectData = getTileMapObjects(levelReference, GAME_OBJECT_LAYER);

	for (let i = gameObjectData.length - 1; i > -1; i--) {
		    const gameObject = gameObjectData[i];
        const gameObjectName = gameObject.name.toLowerCase();
        const gameObjectProperties = gameObject.properties;

        // real dimensions according to tilemap scaling
        const posX = tilemapX + gameObject.x * tilemapScaleX; 
		    const posY = tilemapY + gameObject.y * tilemapScaleY;
        const width = gameObject.width * tilemapScaleX;
		    const height = gameObject.height * tilemapScaleY;
        
        switch(gameObjectName){
            case "player":
                  gameEngine.addEntity(createPlayer(posX, posY, posX, posY));
                  break;
            case "button":
                  gameEngine.addEntity(createButton(posX, posY, gameObjectProperties[0].value));
                  break;
            case "gate":
                  gameEngine.addEntity(createGate(posX, posY, gameObjectProperties[0].value));
                  break;
            case "rat":
                  gameEngine.addEntity(createRat(posX, posY, gameObjectProperties[0].value));
                  break;
            case "crate":
                  gameEngine.addEntity(createCrate(posX, posY));
                  break;
            case "platform":
                  gameEngine.addEntity(createPlatform(posX, posY));
                  break;
            case "spike":
                  gameEngine.addEntity(createSpike(posX, posY));
                  break;
            case "hazard":
                  gameEngine.addEntity(createHazard(posX, posY, width, height));
                  break;
            case "torch":
                  gameEngine.addEntity(createTorch(posX, posY));
                  break;
            case "yarn":
                  gameEngine.addEntity(createYarn(posX, posY, gameObjectProperties[0].value,tilemapScaleX, tilemapScaleY));
                  break;
            case "exit":  
                  gameEngine.addEntity(createExitDoor(posX, posY,gameObjectProperties[0].value, width, height,gameObjectProperties[1].value, gameObjectProperties[2].value, tilemapScaleX, tilemapScaleY,gameObjectProperties[3].value ));
                  
                  break;
            default:
                  console.warn("Unknown object type: " + gameObjectName);
                  break;
        } 
          
    
  	}
}