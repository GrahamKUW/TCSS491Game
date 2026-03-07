function createWindow(x, y, level){
    const entity = {
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/levelicons.png"),
            0, 100 * (level - 1), 132, 100, 1, 1),
        position: new Position(x,y),
        width: 132,
        height: 100        
    }

    return entity;
}