//Test Box to make sure components and systems are working properly.

function createBox(x, y, color, speed) {


    const pilotAnimations = { // maybe change this to pilot
        'idle': {
            frames: [{x:14, y:19, width:100, height: 104 }],
            duration: 0.1
        }
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        animator: new Animator(pilotAnimations, 'idle'),
        collider: new Collider(64, 64)
    }
    return entity;
}