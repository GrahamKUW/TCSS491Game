//Factory for a player
function createPlayer(x, y, respawnX = 300, respawnY = 300) {


    const playerAnimations = {
        //TODO: 
    }

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        playercontrolled: new PlayerControlled(370, respawnX, respawnY),
        collider: new Collider(63, 82, 13, 14),
        velocity: new Velocity(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./sprites/StatueCatsMainCharacter-Sheet.png"), 0, 0, 32, 32, 3, 3),
        gravity: new Gravity(800),
        statueable: new Statueable(true),
        facing: new Facing('right')
    }

    const img = ASSET_MANAGER.getAsset("./sprites/StatueCatsMainCharacter-Sheet.png");
    console.log(img.width, img.height);
    return entity;
}