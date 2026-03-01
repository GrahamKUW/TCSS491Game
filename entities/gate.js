function createGate(x, y, triggerID, colliderWidth = 16, colliderHeight = 64, colliderOffsetX = 8, colliderOffsetY) {

    const activeSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 48, 0, 16, 32, 2, 2);    //open
    const inactiveSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 0, 0, 16, 32, 2, 2);   //closed

    const doorAnimations = {
        'active': {
            frames: [
                {x: 0, y:0, width: 16, height: 32},
                {x: 16, y:0, width: 16, height: 32},
                {x: 32, y:0, width: 16, height: 32},
                {x: 48, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }, 'inactive': {
            frames: [
                {x: 48, y:0, width: 16, height: 32},
                {x: 32, y:0, width: 16, height: 32},
                {x: 16, y:0, width: 16, height: 32},
                {x: 0, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }
    };


    //This will have a collider added to it in ToggleCollider system.
    const entity = { 
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: inactiveSprite,
        static: new Static(),
        togglecollider: new ToggleCollider(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY),
       // togglesprite: new ToggleSprite(activeSprite, inactiveSprite, triggerID),
        animator: new Animator(doorAnimations, 'active'),
        toggleanimator: new ToggleAnimator(triggerID),

    }

    return entity;
}