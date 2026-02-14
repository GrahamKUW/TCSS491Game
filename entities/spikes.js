function createSpike(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), 0, 16, 32, 16, 2 , 2),
        // Changed to be purely visual
        //collider: new Collider(64, 32), //x2 from sprite since scale is x2
        //static: new Static(),
        //hazard: new Hazard()
    }

    return entity;
}

function createHazard(x, y, colliderWidth, colliderHeight) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        collider: new Collider(colliderWidth, colliderHeight),
        static: new Static(),
        hazard: new Hazard()
    }
    return entity;
}