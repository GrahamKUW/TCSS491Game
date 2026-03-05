
// NOTE: use these in level loader, so it works for each scene

/** Special class for screen transition animations */
class FiniteAnimation{

    constructor(gameEngine, sprite, duration, frames, callback){
        this.counter = 0;
        this.duration = duration;
        this.gameEngine = gameEngine;
        this.sprite = sprite;
        this.frames = frames;
        this.callback = callback; // when the animation finishes
        this.removeFromWorld = false;
    }

    draw(){
        // draw until counter = duration then call the callback
    }

    update(){
         // update until counter = duration then call the callback
    }
}

function screenWipeIn(gameEngine, callback){

    // add finite animation for screen wipe in 
    // add to game engine
    // when the animation finishes remove from world  = true
    // add additional callback in
}

function screenWipeOut(gameEngine, callback){
    // add finite animation for screen wipe out 
    // add to game engine
    // when the animation finishes remove from world = true
    // add additional callback in
}