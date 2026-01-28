//TODO: add sprite for this once render system is added.

function createStatue(x, y,) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        gravity: new Gravity(800),
        collider: new Collider(64, 64)
    }
    return entity;
}