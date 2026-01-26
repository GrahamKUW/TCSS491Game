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
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/temporary sprites/player.png"), 0, 0, 32, 32),
        playercontrolled: new PlayerControlled(350, 100, 100),
        collider: new Collider(96, 96), //3x as big as sprite since the renderer triples sprite size right now
        velocity: new Velocity(0, 0),
        animator: new Animator(playerAnimations, 'idle'),
        gravity: new Gravity(800),
        statueable: new Statueable(true)
    }
    return entity;
}