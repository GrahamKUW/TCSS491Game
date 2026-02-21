//Factory for a player
function createPlayer(x, y, respawnX = 336, respawnY = 304) {

    const playerAnimations = {
        'idle-right': {
            frames: [
                { x: 0, y: 32, width: 32, height: 32},
                { x: 32, y: 32, width: 32, height: 32},
                { x: 64, y: 32, width: 32, height: 32},
                { x: 96, y: 32, width: 32, height: 32},
                { x: 128, y: 32, width: 32, height: 32},
            ],
            duration: 0.15
        },
        'idle-left': {
            frames: [
                { x: 0, y: 160, width: 32, height: 32},
                { x: 32, y: 160, width: 32, height: 32},
                { x: 64, y: 160, width: 32, height: 32},
                { x: 96, y: 160, width: 32, height: 32},
                { x: 128, y: 160, width: 32, height: 32},
            ],
            duration: 0.15
        },
         'walk-right': {
            frames: [
                { x: 0, y: 64, width: 32, height: 32},
                { x: 32, y: 64, width: 32, height: 32},
                { x: 64, y: 64, width: 32, height: 32},
                { x: 96, y: 64, width: 32, height: 32},
                { x: 128, y: 64, width: 32, height: 32},
                { x: 160, y: 64, width: 32, height: 32},
                { x: 192, y: 64, width: 32, height: 32},
                { x: 224, y: 64, width: 32, height: 32},
            ],
            duration: 0.1
        },
        'walk-left': {
            frames: [
                { x: 0, y: 192, width: 32, height: 32},
                { x: 32, y: 192, width: 32, height: 32},
                { x: 64, y: 192, width: 32, height: 32},
                { x: 96, y: 192, width: 32, height: 32},
                { x: 128, y: 192, width: 32, height: 32},
                { x: 160, y: 192, width: 32, height: 32},
                { x: 192, y: 192, width: 32, height: 32},
                { x: 224, y: 192, width: 32, height: 32},
            ],
            duration: 0.1
        },
        'jump-right': {
            frames: [
                { x: 0, y: 96, width: 32, height: 32},
                { x: 32, y: 96, width: 32, height: 32},
            ],
            duration: 0.15
        },
        'jump-left': {
            frames: [
                { x: 0, y: 224, width: 32, height: 32},
                { x: 32, y: 224, width: 32, height: 32},
            ],
            duration: 0.15
        }
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        playercontrolled: new PlayerControlled(250, respawnX, respawnY),
        collider: new Collider(32, 48, 14, 16),
        velocity: new Velocity(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacterWReversed.png"), 0, 0, 32, 32, 2, 2),
        gravity: new Gravity(1200),
        statueable: new Statueable(true),
        effect: new Effect('poof', 0.45),
        animator: new Animator(playerAnimations, 'idle-right'),
        facing: new Facing('right'),
        cantrigger: new CanTrigger(),
    }

    const img = ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacterWReversed.png");
    console.log(img.width, img.height);
    return entity;
}