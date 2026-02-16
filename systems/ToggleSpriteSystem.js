/**
 * System for toggling the sprites of all components that have a toggleable sprite, e.g. doors and buttons.
 */
class ToggleSpriteSystem {
    update(deltaTime, game) {
        //filter down to entities with togglesprites, position and trigger component, update sprite accordingly. 
        const Toggleables = game.entities.filter(
            e => e.position && e.togglesprite
        );
        const activeTriggerIDs = game.entities.filter(e => e.trigger && e.trigger.active).map(e => e.trigger.id);

        for (const t of Toggleables) {
            if (activeTriggerIDs.includes(t.togglesprite.triggerID)) {
                t.sprite = t.togglesprite.activeSprite;
            } else {
                t.sprite = t.togglesprite.inactiveSprite;
            }

        }
    }
 }