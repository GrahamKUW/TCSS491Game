class PlayerInputSystem {
    update(deltaTime, game) {


        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.playercontrolled) {
                
                //entity.velocity.dy = 0; unremoved since gravity alters it.
                entity.velocity.dx = 0;

                const speed = entity.playercontrolled.speed;

                //check which direction the player is moving
                if (game.keys['ArrowUp'] || game.keys['w'] || game.keys[' ']) {
                    // can only jump while grounded
                    if (entity.playercontrolled.isGrounded) {
                        entity.velocity.dy = -(speed*1.7);
                    }
                }
                if (game.keys['ArrowLeft'] || game.keys['a']) {
                    entity.velocity.dx = -speed;
                    entity.facing.direction = "left";
                }

                if (game.keys['ArrowRight'] || game.keys['d']) {
                    entity.velocity.dx = speed;
                    entity.facing.direction = "right";
                }

            }
        }

    }
}