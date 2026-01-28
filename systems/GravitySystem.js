class GravitySystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.gravity) {
                entity.velocity.dy += entity.gravity.value * deltaTime;
            }
        }
    }

}