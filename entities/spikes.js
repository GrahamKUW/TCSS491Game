function createSpike(x, y) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/spikes.png"), 0, 16, 32, 16),
        collider: new Collider(96, 48) //x3 from sprite since renderer currently draws at x3
    }

    return entity;
}