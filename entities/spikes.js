function createSpike(x, y, direction) {

    let spriteX = 0;
    let cWidth = 0;
    let cHeight = 0;
    let cOffsetX = 0;
    let cOffsetY = 0;
    switch(direction) {
        case 'up' :
            spriteX = 0;
            break;
        case 'left':
            spriteX = 16;
            break;
        case 'right':
            spriteX = 32;
            break;
        case 'down': 
            spriteX = 48;
            break;
        default:
            direction = 'up'
            spriteX = 0;
            console.log("spike direction undefined, defaulted to up.")
            break;

    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        facing: new Facing(direction), // indicates the direction the spikes will be facing
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/spikes.png"), spriteX, 0, 16, 16, 2 , 2),
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