/**
 * Example system that responds to something being triggered.
 * Currently checks for anything with a togglecollider and if a trigger with ID matching the 
 * toggle colliders triggerId is active, adds a collider and sprite to the entity with the toggle collider.
 */
class ToggleColliderSystem {

    update(deltaTime, game) {


        const edgeTriggerIDS = game.entities
            .filter(e => e.trigger && (e.trigger.wasJustActivated || e.trigger.wasJustDeactivated))
            .map(e => e.trigger.id);


        // Could add another marker component to distinguish this from other entities that may have toggle colliders (doors?)
        const toggleables = game.entities.filter(e => e.togglecollider);

        /**
         * Loop over everything triggerable, if its triggerID matches an active Trigger ID, update the entitiy.
         */
        for (const g of toggleables) {

            if (edgeTriggerIDS.includes(g.togglecollider.triggerID)) {

                if (g.togglecollider.isSolid) {
                    g.collider = null;
                    g.togglecollider.isSolid = false;
                } else {
                    g.collider = new Collider(
                        g.togglecollider.colliderWidth,
                        g.togglecollider.colliderHeight,
                        g.togglecollider.colliderOffsetX,
                        g.togglecollider.colliderOffsetY);

                    //mark it is a solid now since it has a collider
                    g.togglecollider.isSolid = true;
                }
            }

        }
    }
}