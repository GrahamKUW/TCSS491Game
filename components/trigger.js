/**
 * Component to denote a trigger, Has bounds for a box to be checked if something overlaps it
 * and an id for what should respond to it.
 */
class Trigger {
    constructor(width = 16, height = 16, offsetX = 0, offsetY = 0, id) {
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.active = false;
        this.id = id;

    }

    getBounds(position) {
        return {
            left: position.x + this.offsetX,
            top: position.y + this.offsetY,
            right: position.x + this.offsetX + this.width,
            bottom: position.y + this.offsetY + this.height
        };
    }

}


