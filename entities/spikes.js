function createSpike(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), 0, 16, 32, 16, 3 , 3),
        collider: new Collider(96, 48), //x3 from sprite since scale is x3
        static: new Static(),
    }

    return entity;
}