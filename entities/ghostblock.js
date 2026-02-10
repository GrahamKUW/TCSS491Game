
function createGhostBlock(x, y,  colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY, triggerID) {

    //This will have a collider and sprite added to it in ghostblock system.
    const entity = { 
        removeFromWorld: false,
        position: new Position(x, y),
        static: new Static(),
        toggleCollider: new ToggleCollider(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY),
    }

    return entity;
}