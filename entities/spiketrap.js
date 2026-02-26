// Another version of spikes that have a trigger to lunge in the direction they are facing
function createSpikeTrap(x, y, direction) {

    let spriteX = 0;
    let cWidth = 0;
    let cHeight = 0;
    let cOffsetX = 0;
    let cOffsetY = 0;

    // trap's trigger dimentions relative to the spike direction
    const TRAP_TRIGGER_WIDTH = 96;
    const TRAP_TRIGGER_HEIGHT = 160;

    let tWidth = 0;
    let tHeight = 0;
    let tOffsetX = 0;
    let tOffsetY = 0;

    switch(direction) {
        case 'up' :
            spriteX = 0;
            cWidth = 32;
            cHeight = 5;
            cOffsetX = 0;
            cOffsetY = 27;

            tWidth = TRAP_TRIGGER_WIDTH;
            tHeight = TRAP_TRIGGER_HEIGHT;
            tOffsetX = -32;
            tOffsetY = -TRAP_TRIGGER_HEIGHT + 27;
            break;
        case 'left':
            spriteX = 16;
            cWidth = 5;
            cHeight = 32;
            cOffsetX = 27;
            cOffsetY = 0;

            tWidth = TRAP_TRIGGER_HEIGHT; // width == height when facing left or right
            tHeight = TRAP_TRIGGER_WIDTH;
            tOffsetX =  -TRAP_TRIGGER_HEIGHT + 27;
            tOffsetY = -32;
            break;
        case 'right':
            spriteX = 32;
            cWidth = 5;
            cHeight = 32;
            cOffsetX = 0;
            cOffsetY = 0;

            tWidth = TRAP_TRIGGER_HEIGHT;
            tHeight = TRAP_TRIGGER_WIDTH;
            tOffsetX =  5;
            tOffsetY = -32;
            break;
        case 'down': 
            spriteX = 48;
            cWidth = 32;
            cHeight = 5;
            cOffsetX = 0;
            cOffsetY = 0;

            tWidth = TRAP_TRIGGER_WIDTH;
            tHeight = TRAP_TRIGGER_HEIGHT;
            tOffsetX = -32;
            tOffsetY = 5;
            break;
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        facing: new Facing(direction), // indicates the direction the spikes will be facing
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), spriteX, 0, 16, 16, 2 , 2),
        collider: new Collider(cWidth, cHeight, cOffsetX, cOffsetY), //x2 from sprite since scale is x2
        velocity: new Velocity(0, 0),
        trigger: new Trigger(tWidth, tHeight, tOffsetX, tOffsetY, 11), // arbitrary id for spike traps
        static: new Static(),
        returnDelayTimer: 0,
        waitingToReturn: false
    }

    return entity;
}