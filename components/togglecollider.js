/**
 * Test component for an entity that does something when a trigger is activated,
 * currently ghost block (see GhostBlockSystem).
 */
class ToggleCollider {

    constructor(triggerID, colliderWidth, colliderHeight, colliderOffsetX, colliderOffsetY) {
        this.triggerID = triggerID;

        this.isSolid = false;

        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.colliderOffsetX = colliderOffsetX;
        this.colliderOffsetY = colliderOffsetY;

    }
}