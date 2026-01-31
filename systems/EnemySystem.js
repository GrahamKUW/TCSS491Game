class EnemySystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.enemy && entity.hazard) {
                //turn when hitting wall
                if(entity.velocity.dx == 0) {
                    if (entity.facing.direction == "left") {
                        entity.facing.direction = "right";
                        entity.velocity.dx = entity.speed;
                    } 
                    else {
                        entity.facing.direction = "left";
                        console.log(entity.speed);
                        entity.velocity.dx = -entity.speed;
                    }
                }
            }
        }
    }
}