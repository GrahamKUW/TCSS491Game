function createCrate(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/crate.png"), 0, 0, 16, 16, 2, 2),
        collider: new Collider(32, 32), //x2 from sprite since scale is x2
        destructible: new Destructible(),
        static: new Static(),
    }

    return entity;
}