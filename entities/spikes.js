function createSpike(game, x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/spikes.png"), 0, 16, 32, 16),
    }

    console.log("spike created at ", x, y);

    return entity;
}