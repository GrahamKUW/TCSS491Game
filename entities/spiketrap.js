// Another version of spikes that have a trigger to lunge in the direction they are facing
function createSpikeTrap(x, y, direction, game, offset = 0, launchTime = 0.45) {

    let spriteX = 0;
    let cWidth = 0;
    let cHeight = 0;
    let cOffsetX = 0;
    let cOffsetY = 0;

    let hWidth = 0;
    let hHeight = 0;
    let hOffsetX = 0;
    let hOffsetY = 0;

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
            cHeight = 10;
            cOffsetX = 0;
            cOffsetY = 27;

            hWidth = 22;
            hHeight = 16;
            hOffsetX = 5;
            hOffsetY = 6;

            tWidth = TRAP_TRIGGER_WIDTH;
            tHeight = TRAP_TRIGGER_HEIGHT + offset;
            tOffsetX = -32;
            tOffsetY = -TRAP_TRIGGER_HEIGHT + 27 - offset;
            break;
        case 'left':
            spriteX = 16;
            cWidth = 10;
            cHeight = 32;
            cOffsetX = 22;
            cOffsetY = 0;

            hWidth = 16;
            hHeight = 22;
            hOffsetX = 6;
            hOffsetY = 5;

            tWidth = TRAP_TRIGGER_HEIGHT + offset; // width == height when facing left or right
            tHeight = TRAP_TRIGGER_WIDTH;
            tOffsetX =  -TRAP_TRIGGER_HEIGHT + 27 - offset;
            tOffsetY = -32;
            break;
        case 'right':
            spriteX = 32;
            cWidth = 10;
            cHeight = 32;
            cOffsetX = 0;
            cOffsetY = 0;

            hWidth = 16;
            hHeight = 22;
            hOffsetX = 10;
            hOffsetY = 5;

            tWidth = TRAP_TRIGGER_HEIGHT + offset;
            tHeight = TRAP_TRIGGER_WIDTH;
            tOffsetX =  5;
            tOffsetY = -32;
            break;
        case 'down': 
            spriteX = 48;
            cWidth = 32;
            cHeight = 10;
            cOffsetX = 0;
            cOffsetY = 0;

            hWidth = 22;
            hHeight = 16;
            hOffsetX = 5;
            hOffsetY = 10;

            tWidth = TRAP_TRIGGER_WIDTH;
            tHeight = TRAP_TRIGGER_HEIGHT + offset;
            tOffsetX = -32;
            tOffsetY = 5;
            break;
    }

    const triggerWhiteList =  ["playercontrolled"];

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        facing: new Facing(direction), // indicates the direction the spikes will be facing
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spiketraps.png"), spriteX, 0, 16, 16, 2 , 2),
        collider: new Collider(cWidth, cHeight, cOffsetX, cOffsetY), //x2 from sprite since scale is x2
        velocity: new Velocity(0, 0),
        trigger: new Trigger(tWidth, tHeight, tOffsetX, tOffsetY, 11, triggerWhiteList), // arbitrary id for spike traps
        static: new Static(),
        returnTimer: 0,
        launchTime: launchTime,
        isFiring: false,
        child: null
    }

    const childHazard = {
        removeFromWorld: false,
        position: entity.position,
        hazard: new Hazard(),
        collider: new Collider(hWidth, hHeight, hOffsetX, hOffsetY),
        parent: entity
    }

    entity.childs = childHazard;
    game.addEntity(childHazard);

    return entity;
}