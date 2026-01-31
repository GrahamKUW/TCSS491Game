function createBackground(spritePath) {


    const entity =  {
        position: new Position(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset(spritePath), 0, 0, 1024, 768),
    }
    return entity;
}
<<<<<<< Updated upstream
=======

function createTilemapBackground(spritePath, posX, posY, scaleX, scaleY){
    const entity =  {
        position: new Position(posX, posY),
        sprite: new Sprite(ASSET_MANAGER.getAsset(spritePath), 0, 0, 16, 16, scaleX, scaleY),
    }
    return entity;
}
>>>>>>> Stashed changes
