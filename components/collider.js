class Collider {
    constructor(width = 16, height = 16, offsetX = 0, offsetY = 0) {
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        //entity with a collider is going to assume there is a position.
        //offsets are for if collider is not on top left of the entity.
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