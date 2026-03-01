/**
 * Component for entities that change animations when triggered, usually not looping. e.g. gate
 */
class ToggleAnimator {

    constructor(triggerID) {
        this.active = false;
        this.triggerID = triggerID;
    }
}