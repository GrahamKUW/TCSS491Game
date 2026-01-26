class GravitySystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.gravity) {


               if ( entity.position.y < 500) //TODO to make sure they dont fall off screen remove when collision system added.
                entity.velocity.dy += entity.gravity.value * deltaTime;

                 if (entity.position.y > 400)  //TODO to make sure they dont fall off screen remove when collision system added.
                     entity.velocity.dy -= entity.gravity.value * deltaTime;
                    
            }
        }
    }

}