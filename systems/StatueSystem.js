class StatueSystem {
    update(deltaTime, game) {


        for (let entity of game.entities) {


            if (!entity.playercontrolled || !entity.statueable) continue;

            if (entity.statueable.timer > 0) {
                entity.statueable.timer -= deltaTime;
            }

            if ((game.keys['e'] || game.keys['p']) && entity.statueable.timer <= 0) {
                game.addEntity(createStatue(entity.position.x, entity.position.y));


                entity.statueable.timer = entity.statueable.cooldown;

                //teleport to player respawn point and remove velocities.
                entity.position.x = entity.playercontrolled.respawnX;
                entity.position.y = entity.playercontrolled.respawnY;
                entity.velocity.dx = 0;
                entity.velocity.dy = 0;
            }


        }
    }
}