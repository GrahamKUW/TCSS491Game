class Statueable {
    constructor(enabled = true) {
        this.enabled = enabled;
        this.timer = 0;
        this.cooldown = 1.0; //seconds
    }
}