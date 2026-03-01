/**
 * System for toggling if an entity with a toggleable animation is active or not
 */
class ToggleAnimationSystem {
    update(deltaTime, game) {
        
        const Toggleables = game.entities.filter(
            e => e.toggleanimator
        );
        const activeTriggerIDs = game.entities.filter(e => e.trigger && e.trigger.active).map(e => e.trigger.id);

        for (const t of Toggleables) {
            if (activeTriggerIDs.includes(t.toggleanimator.triggerID)) {
                t.toggleanimator.active = true;
            } else {
                t.toggleanimator.active = false;
            }
        }
    }
 }