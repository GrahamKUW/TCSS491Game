
// NOTE: use these in level loader, so it works for each scene



function screenWipeIn(gameEngine, screenCallback = null, removeFromWorld = true){

    // add finite animation for screen wipe in 
    // add to game engine
    // when the animation finishes remove from world  = true
    // add additional callback in

    const transitionAnimation = {
        'transition': { 
            frames: [
                { x: 0*640, y: 360, width: 640, height: 360},
                { x: 1*640, y: 360, width: 640, height: 360},
                { x: 2*640, y: 360, width: 640, height: 360},
                { x: 3*640, y: 360, width: 640, height: 360},
                { x: 4*640, y: 360, width: 640, height: 360},
                { x: 5*640, y: 360, width: 640, height: 360},
                { x: 6*640, y: 360, width: 640, height: 360},
                { x: 7*640, y: 360, width: 640, height: 360},
                { x: 8*640, y: 360, width: 640, height: 360},
                { x: 9*640, y: 360, width: 640, height: 360},
                { x: 10*640, y: 360, width: 640, height: 360},
                { x: 11*640, y: 360, width: 640, height: 360},
                { x: 12*640, y: 360, width: 640, height: 360},
                { x: 13*640, y: 360, width: 640, height: 360},
                { x: 14*640, y: 360, width: 640, height: 360},
                { x: 15*640, y: 360, width: 640, height: 360},
                { x: 16*640, y: 360, width: 640, height: 360},
                { x: 17*640, y: 360, width: 640, height: 360},
                { x: 18*640, y: 360, width: 640, height: 360},
                { x: 19*640, y: 360, width: 640, height: 360},
                { x: 20*640, y: 360, width: 640, height: 360},

            ],
            duration: 0.0125,
            loops: false
        }
    }
    
    const entity = {
        removeFromWorld: false,
        position: new Position(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/Screen Wipe 640x360-Sheet.png"), 0, 0, 640, 360, 2, 2),
        animator: new Animator(transitionAnimation, 'transition', {frame: 19, callback: () => { if(screenCallback){ screenCallback(); }  entity.removeFromWorld = removeFromWorld;}}),
        isUserInterface: true,
    }

    gameEngine.addEntity(entity);
}

function screenWipeOut(gameEngine, screenCallback = null, removeFromWorld = true){
    // add finite animation for screen wipe out 
    // add to game engine
    // when the animation finishes remove from world = true
    // add additional callback in

    const transitionAnimation = {
        'transition': { 
            frames: [
                { x: 0*640, y: 0, width: 640, height: 360},
                { x: 1*640, y: 0, width: 640, height: 360},
                { x: 2*640, y: 0, width: 640, height: 360},
                { x: 3*640, y: 0, width: 640, height: 360},
                { x: 4*640, y: 0, width: 640, height: 360},
                { x: 5*640, y: 0, width: 640, height: 360},
                { x: 6*640, y: 0, width: 640, height: 360},
                { x: 7*640, y: 0, width: 640, height: 360},
                { x: 8*640, y: 0, width: 640, height: 360},
                { x: 9*640, y: 0, width: 640, height: 360},
                { x: 10*640, y: 0, width: 640, height: 360},
                { x: 11*640, y: 0, width: 640, height: 360},
                { x: 12*640, y: 0, width: 640, height: 360},
                { x: 13*640, y: 0, width: 640, height: 360},
                { x: 14*640, y: 0, width: 640, height: 360},
                { x: 15*640, y: 0, width: 640, height: 360},
                { x: 16*640, y: 0, width: 640, height: 360},
                { x: 17*640, y: 0, width: 640, height: 360},
                { x: 18*640, y: 0, width: 640, height: 360},
                { x: 19*640, y: 0, width: 640, height: 360},
                { x: 20*640, y: 0, width: 640, height: 360},
            ],
            duration: 0.0125,
            loops: false
        }
    }
    
    const entity = {
        removeFromWorld: false,
        position: new Position(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/Screen Wipe 640x360-Sheet.png"), 0, 0, 640, 360, 2, 2),
        animator: new Animator(transitionAnimation, 'transition', {frame: 19, callback: () => { if(screenCallback){ screenCallback(); }   entity.removeFromWorld = removeFromWorld;}}),
        isUserInterface: true,
    }

    gameEngine.addEntity(entity);
}

function screenBlocker(gameEngine){
    const transitionAnimation = {
        'transition': { 
            frames: [
                { x: 0*640, y: 0, width: 640, height: 360},
                
            ],
            duration: 1,
            loops: false
        }
    }
    
    const entity = {
        removeFromWorld: false,
        persists: true,
        position: new Position(0, 0),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/Screen Wipe 640x360-Sheet.png"), 0, 0, 640, 360, 2, 2),
        animator: new Animator(transitionAnimation, 'transition'),
        isUserInterface: true,
    }

    gameEngine.addEntity(entity);
    return entity;
}