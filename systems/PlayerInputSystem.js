let pressedAnotherButton = false;

class PlayerInputSystem {
    update(deltaTime, game) {

        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.playercontrolled) {

                //entity.velocity.dy = 0; unremoved since gravity alters it.
                entity.velocity.dx = 0;

                const speed = entity.playercontrolled.speed;

                //check which direction the player is moving
                if (game.keys['ArrowUp'] || game.keys['w'] || game.keys[' ']) {
                    // can only jump while grounded or havent fallen for longer than coyote time
                    if (entity.velocity.dy >= 0 && (entity.playercontrolled.isGrounded ||
                        entity.playercontrolled.timeSinceGrounded <= entity.playercontrolled.coyoteTime)) {

                        entity.velocity.dy = -(speed * 1.7);
                        EFFECT_FACTORY.create(game, entity, 'jumpDust');
                        pressedAnotherButton = true;
                        console.log("Player jumped!");
                    }
                }
                if (game.keys['ArrowLeft'] || game.keys['a']) {
                    entity.velocity.dx = -speed;
                    entity.facing.direction = "left";
                    pressedAnotherButton = true;

                }

                if (game.keys['ArrowRight'] || game.keys['d']) {
                    entity.velocity.dx = speed;
                    entity.facing.direction = "right";
                    pressedAnotherButton = true;
                }

                // jank and doesn't really follow ecs but its a quick add.
                if (game.keys['r']) {

                    if (pressedAnotherButton) {
                        //console.log("RESET");
                        reloadCurrentLevel();
                        pressedAnotherButton = false;
                    }

                }

            }
        }

    }
}