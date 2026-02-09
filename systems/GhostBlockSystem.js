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
                        g.toggleCollider.offsetX,
                        g.toggleCollider.offsetY); 

                    //could refactor the component to have active and deactive sprites. or add ghostblock component
                    // also this sprite is reusing 1 of the tiles since IDK if we will even have these ghost blocks
                    // and I did not want to add a new sprite
                    g.sprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsTileset.png"), 0, 0, 16, 16, 4, 4);
                    //mark it is a solid now since it has a collider
                    g.toggleCollider.isSolid = true;
                }

            } else {
                /** TriggerID is not active, deactivate the ghost block */
                if (g.collider) {
                    g.collider = null;
                    g.toggleCollider.isSolid = false;
                    g.sprite = null;
                }

            }
        }
    }
}