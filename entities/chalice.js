function createChalice(x, y,) {
    const chaliceAnimation = {
        'sparkle': { 
            frames: [
                { x: 0, y: 0, width: 32, height: 32 },
                { x: 32, y: 0, width: 32, height: 32 },
                { x: 64, y: 0, width: 32, height: 32 },
                { x: 96, y: 0, width: 32, height: 32 },
                { x: 128, y: 0, width: 32, height: 32 },
                { x: 160, y: 0, width: 32, height: 32 },
            ],
            duration: 0.15,
            loops: true
        },
    }
    
    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        gravity: new Gravity(800),
        collider: new Collider(36, 64, 14, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/chalice.png"), 0, 0, 32, 32, 2, 2),
        animator: new Animator(chaliceAnimation, 'sparkle'),
        effect: new Effect('poof', 0.45),
    }
    return entity;
}