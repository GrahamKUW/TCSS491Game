/*
These creation methods are simply for things that arent interracted with that I want to have exist.

These could probably go in the button one, but they are just for show, so I didnt want to make that
class any more needlessly cluttered than it already is. 
*/


//The block that says Character used in the settings menu. 
function createCharacterObject(x, y, scalingFactor){
    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/settingsbuttons.png"),
            0, 0, 160, 48, scalingFactor, scalingFactor
        ),
        width: 192 * scalingFactor,
        height: 48 * scalingFactor,
        position: new Position(x,y)
    }
    
    return entity;
}

//The block that says Sound used in the settings menu.
function createSoundObject(x, y, scalingFactor) {
    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/settingsbuttons.png"),
            0, 48, 160, 48, scalingFactor, scalingFactor
        ),
        width: 192 * scalingFactor,
        height: 48 * scalingFactor,
        position: new Position(x,y)
    }
    
    return entity;
}


//The display for the audio volume, used in the settings menu. Requires access to the vol var
//  in the menus file. 
function createAudioObject(x, y, scalingFactor = 1, menu) {
    let offset = menu.vol * 10;
    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/audio.png"),
            0, 24 * offset, 136, 24, scalingFactor, scalingFactor
        ),
        width: 192 * scalingFactor,
        height: 48 * scalingFactor,
        position: new Position(x,y)
    }
    
    return entity;
}

function createManekiObject(x, y, scalingFactor = 1) {

    const ManekiAnimations = {
        'idle-right': {
            frames: [
                { x: 0, y: 32, width: 32, height: 32},
                { x: 32, y: 32, width: 32, height: 32},
                { x: 64, y: 32, width: 32, height: 32},
                { x: 96, y: 32, width: 32, height: 32},
                { x: 128, y: 32, width: 32, height: 32},
            ],
            duration: 0.15,
            loops: !altCharacter
        },
    }

    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacterWReversed.png"),
            0, 0, 32, 32, scalingFactor, scalingFactor
        ),
        animator: new Animator(ManekiAnimations, 'idle-right'),
        position: new Position(x,y)
    }
    return entity;
}

function createRakkiObject(x, y, scalingFactor = 1) {

    const RakkiAnimations = {
        'idle-right': {
            frames: [
                { x: 0, y: 32, width: 32, height: 32},
                { x: 32, y: 32, width: 32, height: 32},
                { x: 64, y: 32, width: 32, height: 32},
                { x: 96, y: 32, width: 32, height: 32},
                { x: 128, y: 32, width: 32, height: 32},
            ],
            duration: 0.15,
            loops: altCharacter
        },
    }

    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/Alt_StatueCatsMainCharacterWReversed.png"),
            0, 0, 32, 32, scalingFactor, scalingFactor
        ),
        animator: new Animator(RakkiAnimations, 'idle-right'),
        position: new Position(x,y)
    }
    return entity;
}

function createStatueObject(x, y, scalingFactor = 1) {
    let statueSprite = null;
    if(!altCharacter) {
        statueSprite = ASSET_MANAGER.getAsset("./assets/sprites/StatueCatsMainCharacterWReversed.png");
    }
    else statueSprite = ASSET_MANAGER.getAsset("./assets/sprites/Alt_StatueCatsMainCharacterWReversed.png");
    const entity = {
        sprite: new Sprite(
            statueSprite,
            0, 256, 32, 32, scalingFactor, scalingFactor
        ),
        position: new Position(x,y)
    }
    return entity;
}

function createYarnObject(x, y, scalingFactor = 1) {
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
    const entity = {
        sprite: new Sprite(
            ASSET_MANAGER.getAsset("./assets/sprites/YarnBall.png"),
            0, 256, 32, 32, scalingFactor, scalingFactor
        ),
        animator: new Animator(yarnAnimation, 'float'),
        position: new Position(x,y)
    }
    return entity;
}