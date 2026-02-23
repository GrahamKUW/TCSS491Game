/*
System for handling collecting and keeping track of yarn balls.
*/

class YarnSystem{
    constructor() {
        this.yarnCollected = 0;
    }
    update (deltaTime, game) {
        for (let entity of game.entities) {
            //filter down to only players for getting life counter
            if (entity.trigger && entity.trigger.id == 9 && entity.trigger.active) {
                entity.removeFromWorld = true;
                EFFECT_FACTORY.create(game, entity, 'collect'); 
                this.yarnCollected++;

                //TODO: is not accurate when resetting level (have to make it a game state variable or something?)
                console.log("You got a yarn ball! You've collected " + this.yarnCollected + " yarn balls total."); // will add to UI eventually
            }
        }
        
    }
}