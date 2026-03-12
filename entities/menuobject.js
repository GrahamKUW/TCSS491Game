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