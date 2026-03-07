/**
 * System for toggling the sprites of entities that have a toggleable sprite component, buttons.
 */
class ButtonSpriteSystem {
    update(deltaTime, game) {
        //filter down to entities with togglesprites, position and trigger component, update sprite accordingly. 
        const Toggleables = game.entities.filter(
            e => e.position && e.togglesprite && e.trigger
        );

        //Changes sprite of entities that have a togglesprite and trigger while their trigger is currently active.
        for (const t of Toggleables) {

            //Change to be stricter or move elsewhere if we add more entities with togglesprites and triggers.
            if (t.trigger.wasJustActivated) {
                console.log("Button Pressed!");
                AUDIO_MANAGER.playOnce("Button_Press");
            }

            if (t.trigger.active) {
                t.sprite = t.togglesprite.activeSprite;
            } else {
                t.sprite = t.togglesprite.inactiveSprite;
            }

        }
    }
 }