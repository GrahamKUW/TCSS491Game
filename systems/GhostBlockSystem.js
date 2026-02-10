/**
 * Example system that responds to something being triggered.
 * Currently checks for anything with a togglecollider and if a trigger with ID matching the 
 * toggle colliders triggerId is active, adds a collider and sprite to the entity with the toggle collider.
 */
class GhostBlockSystem {

    update(deltaTime, game) {
        const activeTriggerIDS = game.entities.filter(e => e.trigger && e.trigger.active).map(e => e.trigger.id);
        // Could add another marker component to distinguish this from other entities that may have toggle colliders (doors?)
        const ghostBlocks = game.entities.filter(e => e.toggleCollider);

        /**
         * Loop over everything triggerable, if its triggerID matches an active Trigger ID, update the entitiy.
         */
        for (const g of ghostBlocks) {
            if (activeTriggerIDS.includes(g.toggleCollider.triggerID)) {
                //Give it a collider and sprite component
                if (!g.toggleCollider.isSolid) {
                    g.collider = new Collider(
                        g.toggleCollider.colliderWidth,
                        g.toggleCollider.colliderHeight,
                        g.toggleCollider.colliderOffsetX,
                        g.toggleCollider.colliderOffsetY); 

                    //specific to gates (have to change if we add more triggers)!
                    console.log(g.toggleCollider.offsetX);
                    g.sprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 0, 0, 16, 32, 2, 2);

                    //mark it is a solid now since it has a collider
                    g.toggleCollider.isSolid = true;
                }

            } else {
                /** TriggerID is not active, deactivate the ghost block */
                if (g.collider) {
                    g.collider = null;
                    g.toggleCollider.isSolid = false;
                    //specific to gates (have to change if we add more triggers)!
                    g.sprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/gate.png"), 48, 0, 16, 32, 2, 2);
                }

            }
        }
    }
}