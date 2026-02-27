/*
System for transitioning to end credits after the player breaks the chalice in the final level.
*/
class WinSystem{
    update (deltaTime, game) {
        for (let entity of game.entities) {
            //filter down to only chalice entity
            if (!entity.gravity || entity.hazard || entity.cantrigger) continue;

            if(entity.position.y > entity.position.startY + 10 && entity.velocity.dy == 0) {
                entity.removeFromWorld = true;
                EFFECT_FACTORY.create(game, entity, 'poof');

                setTimeout(() => {
                    console.log("You win! loading credits..."); // replace with transition to credits scene.
                }, 2000);
            }
        }
    }
}