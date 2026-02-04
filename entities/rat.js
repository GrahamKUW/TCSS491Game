function createRat(x, y, speed) {


    const ratAnimations = {
        'walk-right': { 
            frames: [
                { x: 0, y: 0, width: 42, height: 16 },
                { x: 42, y: 0, width: 42, height: 16 },
                { x: 84, y: 0, width: 42, height: 16 },
                { x: 126, y: 0, width: 42, height: 16 }
            ],
            duration: 0.15
        },
        'walk-left': {
            frames: [
                { x: 0, y: 16, width: 42, height: 16 },
                { x: 42, y: 16, width: 42, height: 16 },
                { x: 84, y: 16, width: 42, height: 16 },
                { x: 126, y: 16, width: 42, height: 16 }
            ],
            duration: 0.15
        }
    }


    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        speed: speed,
        velocity: new Velocity(speed, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/rat.png"), 0, 0, 42, 16, 2, 2),
        collider: new Collider(80, 24, 2, 8), //(updated to fit sprite dimensions) x2 from sprite since renderer is currently drawing x2
        animator: new Animator(ratAnimations, 'walk-right'),
        facing: new Facing('right'),
        destructible: new Destructible(),
        hazard: new Hazard()
    }

    return entity;
}