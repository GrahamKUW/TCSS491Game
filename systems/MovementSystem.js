class MovementSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.position && entity.velocity) {
                const newX = entity.position.x + entity.velocity.dx * deltaTime;
                const newY = entity.position.y + entity.velocity.dy * deltaTime;

                entity.position.oldX = entity.position.x;
                entity.position.oldY = entity.position.y;
                entity.position.x = newX;
                entity.position.y = newY;
            }
        }
    }
}