class EnemySystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (!entity.destructible || !entity.hazard || entity.child) continue; 

            //want to check if the rat collider is facing the ground. If not, turn around.
            const collider = entity.collider;

            const feetY = entity.position.y + collider.height + collider.offsetY + 1;

            let probeX;

            if (entity.facing.direction === "left") {
                probeX = entity.position.x - 1;
            } else {
                probeX = entity.position.x + collider.width + collider.offsetX + 1;
            }

            const groundAhead = game.getSystem(CollisionSystem).isSolidAt(probeX, feetY, game);
            const wallAhead = game.getSystem(CollisionSystem).isSolidAt(probeX, feetY - 20, game);

            //Turn around if no ground ahead
            if (!groundAhead) {
                this.flip(entity);
            }

            //turn when hitting wall
            if(wallAhead) {
                this.flip(entity)
            }
        }
    }

    flip(entity) {
        if (entity.facing.direction === "left") {
            entity.facing.direction = "right";
            entity.velocity.dx = entity.speed;
        } 
        else {
            entity.facing.direction = "left";
            entity.velocity.dx = -entity.speed;
        }
    }
}