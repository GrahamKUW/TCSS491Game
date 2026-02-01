function createPlatform(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/platform.png"), 0, 0, 32, 16, 2 , 2),
        collider: new Collider(64, 12), //x2 from sprite since scale is x2
        static: new Static(),
    }

    return entity;
}