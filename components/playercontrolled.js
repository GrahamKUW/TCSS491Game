// PlayerControlled component - marks this entity as player-controlled
class PlayerControlled {
    constructor(speed = 50, respawnX = 0, respawnY = 0, isGrounded = false) {
        this.speed = speed;  // Movement speed in pixels per second

        this.respawnX = respawnX;
        this.respawnY = respawnY;

        this.isGrounded = isGrounded;
        this.lives = 9;

        this.timeSinceGrounded = 0;
        this.coyoteTime = 0.15;
    }
}