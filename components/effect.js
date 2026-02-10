// Effect component - defines what visual effect to spawn when triggered in different systems
class Effect {
    constructor(type = 'poof', duration = 0.5) {
        this.type = type;        // 'poof', 'dust', etc.
        this.duration = duration; // How long the effect lasts
    }
}