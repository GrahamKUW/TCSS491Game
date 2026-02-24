function createTorch(x, y) {
    const torchAnimation = {
        'flicker': { 
            frames: [
                { x: 0, y: 0, width: 16, height: 16 },
                { x: 16, y: 0, width: 16, height: 16 },
            ],
            duration: 0.15,
            loops: true
        }
    }


    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/torch.png"), 0, 0, 16, 16, 2, 2),
        animator: new Animator(torchAnimation, 'flicker'),
    }

    return entity;
}