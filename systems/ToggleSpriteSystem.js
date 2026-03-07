/**
 * System for toggling the sprites of all components that have a toggleable sprite, buttons.
 */
class ToggleSpriteSystem {
    update(deltaTime, game) {
        //filter down to entities with togglesprites, position and trigger component, update sprite accordingly. 
        const Toggleables = game.entities.filter(
            e => e.position && e.togglesprite
        );
        const activeTriggerIDs = game.entities.filter(e => e.trigger && e.trigger.active).map(e => e.trigger.id);



        //Changes sprite of entities that have a togglesprite and trigger while their trigger is currently active. 
        for (const t of Toggleables) {

            if (t.trigger.wasJustActivated) {
                console.log("Button Pressed!");
            }

            if (t.trigger.active) {
                t.sprite = t.togglesprite.activeSprite;
            } else {
                t.sprite = t.togglesprite.inactiveSprite;
            }

        }
    }
 }