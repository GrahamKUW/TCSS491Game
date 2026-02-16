/**
 * Component for entities that change sprites when triggered. e.g. button
 */
class ToggleSprite {

    constructor(activeSprite, inactiveSprite, triggerID) {
        this.triggerID = triggerID;

        this.activeSprite = activeSprite;
        this.inactiveSprite = inactiveSprite;
    }
}