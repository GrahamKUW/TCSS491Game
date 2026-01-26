//Test Box to make sure components and systems are working properly.

function createBox(game, x, y, color, speed) {


    const pilotAnimations = { // maybe change this to pilot
        'idle': {
            frames: [{x:14, y:19, width:100, height: 104 }],
            duration: 0.1
        }
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(100, 100),
        animator: new Animator(pilotAnimations, 'idle'),
    }
    return entity;
}