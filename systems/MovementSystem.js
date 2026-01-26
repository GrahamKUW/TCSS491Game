class MovementSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.position && entity.velocity) {
                const newX = entity.position.x + entity.velocity.dx * deltaTime;
                const newY = entity.position.y + entity.velocity.dy * deltaTime;

                //console.log("newx:1 " + newX);

                entity.position.x = newX;
                entity.position.y = newY;
            }
        }
    }
}