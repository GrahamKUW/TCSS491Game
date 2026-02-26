function createSpike(x, y, direction) {

    let spriteX = 0;
    let cWidth = 0;
    let cHeight = 0;
    let cOffsetX = 0;
    let cOffsetY = 0;
    switch(direction) {
        case 'up' :
            spriteX = 0;
            cWidth = 32;
            cHeight = 5;
            cOffsetX = 0;
            cOffsetY = 27;
            break;
        case 'left':
            spriteX = 16;
            cWidth = 5;
            cHeight = 32;
            cOffsetX = 0;
            cOffsetY = 0;
            break;
        case 'right':
            spriteX = 32;
            cWidth = 5;
            cHeight = 32;
            cOffsetX = 27;
            cOffsetY = 0;
            break;
        case 'down': 
            spriteX = 48;
            cWidth = 32;
            cHeight = 5;
            cOffsetX = 0;
            cOffsetY = 0;
            break;
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        facing: new Facing(direction), // indicates the direction the spikes will be facing
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), spriteX, 0, 16, 16, 2 , 2),
        collider: new Collider(cWidth, cHeight, cOffsetX, cOffsetY), //x2 from sprite since scale is x2
        static: new Static(),
    }

    return entity;
}

function createHazard(x, y, colliderWidth, colliderHeight) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        collider: new Collider(colliderWidth, colliderHeight),
        static: new Static(),
        hazard: new Hazard()
    }
    return entity;
}