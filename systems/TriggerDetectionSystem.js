/**
 * System to detect when activators overlap triggers and set the triggers to active.
 */
class TriggerDetectionSystem {
    update(deltaTime, game) {

        //filter to everything that can be triggered
        const triggers = game.entities.filter(
            e => e.trigger && e.position
        );

        //flter to everything that can activate triggers
        const activators = game.entities.filter(
            e => e.cantrigger && e.position && e.collider
        );

        for (const t of triggers) {
            //reset all triggers
            t.trigger.active = false;

            //specific to buttons (have to change if we add more triggers)!
            t.sprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/button.png"), 0, 0, 16, 16, 2, 2);

            const triggerBounds = t.trigger.getBounds(t.position);
            
            //check if any activator hits this trigger
            for (const a of activators) {
                const activatorBounds = a.collider.getBounds(a.position);

                if (this.aabbCollision(triggerBounds, activatorBounds)) {
                    t.trigger.active = true;
                    //specific to buttons (have to change if we add more triggers)!
                    t.sprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/button.png"), 16, 0, 16, 16, 2, 2); 
                    //  exit early since something activated this trigger,
                    //  no need to check for multiple
                    break;
                }
            }
        }
    }

    /**
     * @param {*} b1 the first bounds to check.
     * @param {*} b2 The second bounds to check.
     * @returns 
     */
    aabbCollision(b1, b2) {
        return (
            b1.left < b2.right &&
            b1.right > b2.left &&
            b1.top < b2.bottom &&
            b1.bottom > b2.top
        );
    }
}
