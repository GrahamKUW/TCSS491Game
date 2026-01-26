// PlayerControlled component - marks this entity as player-controlled
class PlayerControlled {
    constructor(speed = 100, respawnX = 0, respawnY = 0) {
        this.speed = speed;  // Movement speed in pixels per second

        this.respawnX = respawnX;
        this.respawnY = respawnY;
    }
}