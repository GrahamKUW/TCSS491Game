//TODO: add sprite for this once render system is added.

function createStatue(x, y,) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        gravity: new Gravity(800),
<<<<<<< Updated upstream
        collider: new Collider(63, 82, 14, 14),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacter-Sheet.png"), 0, 128, 32, 32, 3, 3)
=======
        collider: new Collider(32, 48, 14, 16),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacter-Sheet.png"), 0, 128, 32, 32, 2, 2)
>>>>>>> Stashed changes
    }
    return entity;
}