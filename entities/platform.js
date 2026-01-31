function createPlatform(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/platform.png"), 0, 0, 32, 16, 3 , 3),
        collider: new Collider(96, 18), //x3 from sprite since scale is x3
        static: new Static(),
    }

    return entity;
}