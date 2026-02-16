function createGate(x, y, triggerID, colliderWidth = 16, colliderHeight = 64, colliderOffsetX = 8, colliderOffsetY) {

    const inactiveSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 48, 0, 16, 32, 2, 2);
    const activeSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 0, 0, 16, 32, 2, 2);

    //This will have a collider added to it in ToggleCollider system.
    const entity = { 
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: inactiveSprite,
        static: new Static(),
        togglecollider: new ToggleCollider(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY),
        togglesprite: new ToggleSprite(activeSprite, inactiveSprite, triggerID),
    }

    return entity;
}