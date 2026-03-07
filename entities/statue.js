function createStatue(x, y) {

    //if(alt == true) {
        //let playerSheet = ASSET_MANAGER.getAsset("./assets/sprites/Alt_StatueCatsMainCharacterWReversed.png");
    //}
    //else {
        let playerSheet = ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacterWReversed.png");
    //}

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        velocity: new Velocity(0, 0),
        gravity: new Gravity(800),
        collider: new Collider(32, 48, 14, 18),
        sprite: new Sprite(playerSheet, 0, 128, 32, 32, 2, 2),
        effect: new Effect('dust', 0.2), 
        cantrigger: new CanTrigger(),
    }
    return entity;
}