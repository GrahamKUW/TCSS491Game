/**
 * System for toggling if an entity with a toggleable animation is active or not
 */
class ToggleAnimationSystem {
    update(deltaTime, game) {
        
        const Toggleables = game.entities.filter(
            e => e.toggleanimator
        );

        const edgeTriggerIDS = game.entities
            .filter(e => e.trigger && (e.trigger.wasJustActivated || e.trigger.wasJustDeactivated))
            .map(e => e.trigger.id);


        for (const t of Toggleables) {


            if (edgeTriggerIDS.includes(t.toggleanimator.triggerID)) {

                t.toggleanimator.hasBeenToggled = true;
                if (t.toggleanimator.active) {
                    t.toggleanimator.active = false;
                } else {
                    t.toggleanimator.active = true;
                }
            }
        }
    }
 }