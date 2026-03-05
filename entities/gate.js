function createGate(x, y, triggerID, colliderWidth = 16, colliderHeight = 64, colliderOffsetX = 8, colliderOffsetY, startClosed = true) {

    const activeSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 48, 0, 16, 32, 2, 2);    //open
    const inactiveSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 0, 0, 16, 32, 2, 2);   //closed

    const doorAnimations = {
        'active': { //open
            frames: [
                {x: 0, y:0, width: 16, height: 32},
                {x: 16, y:0, width: 16, height: 32},
                {x: 32, y:0, width: 16, height: 32},
                {x: 48, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }, 'inactive': { //closed
            frames: [
                {x: 48, y:0, width: 16, height: 32},
                {x: 32, y:0, width: 16, height: 32},
                {x: 16, y:0, width: 16, height: 32},
                {x: 0, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }, 'start-active': {
            frames: [
                {x: 48, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }, 'start-inactive': {
            frames: [
                {x: 0, y:0, width: 16, height: 32},
            ],
            duration: .15,
            loops: false
        }
    };


    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: startClosed ? inactiveSprite : activeSprite,
        static: new Static(),
        togglecollider: new ToggleCollider(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY, startClosed),
        animator: new Animator(doorAnimations, startClosed ? 'start-inactive': 'start-active'),
        toggleanimator: new ToggleAnimator(triggerID, !startClosed),
    }

    //Doors that start open will have a collider added by the toggle collider.
    if (startClosed) {
        entity.collider = new Collider(colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY);
    }
    

    return entity;

}