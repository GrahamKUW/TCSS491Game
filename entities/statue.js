//TODO: add sprite for this once render system is added.

function createStatue(game, x, y, color, speed) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        gravity: new Gravity(800)
    }
    return entity;
}