function createMenuBackground (x, y) {
    const entity = {
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/menubackground.png"), 
        0, 0, 1280, 720, 1, 1), 
        position: new Position(x,y)
    }

    return entity; 
}

function createTitle(x, y){
    const entity = {
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/title.png"), 
        0, 0, 1280, 720, 1, 1), 
        position: new Position(x,y)
    }
    return entity;
}