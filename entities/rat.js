function createRat(x, y, speed) {


    const ratAnimations = {
        'idle-right': { //there is not truly an idle animation for the rat, this is just proof of concept for the animator
            frames: [
                { x: 0, y: 0, width: 42, height: 16 },
                { x: 42, y: 0, width: 42, height: 16 }
            ],
            duration: 0.1
        }
    }


    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/rat.png"), 0, 0, 42, 16),
        collider: new Collider(126, 48),
        animator: new Animator(ratAnimations, 'idle-right'),
        facing: new Facing('right')
    }

    return entity;
}