//A player
//TODO: missing sprite

function createPlayer(x, y, color, speed) {


    const playerAnimations = { // temp until render system is complete, Mariott has an example
        'idle': {
            frames: [{x:14, y:19, width:100, height: 104 }],
            duration: 0.1
        }
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        playercontrolled: new PlayerControlled(350, 100, 100),
        collider: new Collider(64, 64),
        velocity: new Velocity(0, 0),
        animator: new Animator(playerAnimations, 'idle'),
        gravity: new Gravity(800),
        statueable: new Statueable(true)
    }
    return entity;
}