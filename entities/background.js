function createBackground(spritePath) {


    const entity =  {
        position: new Position(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset(spritePath), 0, 0, 1024, 768),
    }

    console.log("background created from:" + spritePath);

    return entity;
}
