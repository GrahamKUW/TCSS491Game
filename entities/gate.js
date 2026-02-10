function createGate(x, y, triggerID, colliderWidth = 16, colliderHeight = 64, colliderOffsetX = 8, colliderOffsetY) {

    //This will have a collider added to it in ghostblock system.
    const entity = { 
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 48, 0, 16, 32, 2, 2),
        static: new Static(),
        toggleCollider: new ToggleCollider(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY),
    }

    return entity;
}