const TILE_LAYER = 0;
const COLLISION_LAYER = 1;

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
function getTileMapColliders(mapString = "prototype_level") {
  const map = TileMaps[mapString];

  if (map === null || map === undefined) {
    throw new Error(
      "Unable to reference TileMap: " + mapString + " there was an issue!",
    );
  }

  return map.layers[COLLISION_LAYER].objects;
}