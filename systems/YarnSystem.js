/*
System for handling collecting and keeping track of yarn balls.
*/

class YarnSystem{
    update (deltaTime, game) {
        for (let entity of game.entities) {
            //filter down to only players for getting life counter
            if (entity.trigger && entity.trigger.id == 9 && entity.trigger.active) {
                entity.removeFromWorld = true;
                EFFECT_FACTORY.create(game, entity, 'collect'); 
                game.yarnCollected++;

                console.log("You got a yarn ball! You've collected " + game.yarnCollected + " yarn balls total."); // will add to UI eventually
            }
        }
        
    }
}