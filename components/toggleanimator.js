/**
 * Component for entities that change animations when triggered, usually not looping. e.g. gate
 */
class ToggleAnimator {

    constructor(triggerID, active = false) {
        this.active = active;
        this.triggerID = triggerID;
        this.hasBeenToggled = false;
    }
}