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

            const triggerBounds = t.trigger.getBounds(t.position);

            //check if any activator hits this trigger
            for (const a of activators) {
                const activatorBounds = a.collider.getBounds(a.position);

                if (this.aabbCollision(triggerBounds, activatorBounds)) {
                    //  If the trigger has a whitelist,
                    //  check if any components of the activator a are in it. 
                    if (t.trigger.whitelist) {
                        for (let i = 0; i < t.trigger.whitelist.length; i++) {
                            if (Object.hasOwn(a, t.trigger.whitelist[i])) {
                                t.trigger.active = true;
                                break;
                            }
                        }
                    } else {
                        //  exit early since something activated this trigger,
                        //  no need to check for multiple
                        t.trigger.active = true;
                        break;
                    }
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
