function createRat(game, x, y, speed) {



    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/rat.png"), 0, 0, 42, 16),
    }

    return entity;
}