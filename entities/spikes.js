function createSpike(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), 0, 16, 32, 16, 2 , 2),
        collider: new Collider(64, 32), //x2 from sprite since scale is x2
        static: new Static(),
        hazard: new Hazard()
    }

    return entity;
}