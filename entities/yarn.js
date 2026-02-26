function createYarn(x, y, id, tilemapScaleX, tilemapScaleY) {


    const yarnAnimation = {
        'float': { 
            frames: [
                { x: 0, y: 0, width: 32, height: 32 },
                { x: 32, y: 0, width: 32, height: 32 },
                { x: 64, y: 0, width: 32, height: 32 },
                { x: 96, y: 0, width: 32, height: 32 },
            ],
            duration: 0.25,
            loops: true
        }
    }

    const triggerWhiteList =  ["playercontrolled"];

    const entity = {
        removeFromWorld: false,
        position: new Position(x,y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/YarnBall.png"), 0, 0, 32, 32, tilemapScaleX, tilemapScaleY),
        animator: new Animator(yarnAnimation, 'float'),
        effect: new Effect('collect', 0.35),
        trigger: new Trigger(32, 32, 16, 16, id, triggerWhiteList), // 9 = id for yarn so it wont affect gates, etc.
    }

    return entity;
}