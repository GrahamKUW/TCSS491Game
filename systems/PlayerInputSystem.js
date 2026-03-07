let pressedAnotherButton = false;
let jumpCooldown = 0.3125; // can be lowered if its an issue, playtest needed
let jumpCounter = 0;

class PlayerInputSystem {
    update(deltaTime, game) {


        // Restarting level
        // jank and doesn't really follow ecs but its a quick add.
        if (game.keys['r']) {

            if (pressedAnotherButton) {
                //console.log("RESET");
                reloadCurrentLevel();
                pressedAnotherButton = false;
            }

        }

        jumpCounter = Math.max(0, jumpCounter - deltaTime);
        
        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.playercontrolled) {

                //entity.velocity.dy = 0; unremoved since gravity alters it.
                entity.velocity.dx = 0;

                const speed = entity.playercontrolled.speed;

                //check which direction the player is moving
                if (game.keys['ArrowUp'] || game.keys['w'] || game.keys[' ']) {
                    // can only jump while grounded or havent fallen for longer than coyote time
                    
                    
                    // took out entity.playercontrolled.isGrounded ||
                    if (entity.velocity.dy >= 0 && entity.playercontrolled.timeSinceGrounded <= entity.playercontrolled.coyoteTime) {
                        
                        if(jumpCounter > 0){ 
                            continue;
                        }

                        entity.velocity.dy = -(speed * 1.7);

                        

                        EFFECT_FACTORY.create(game, entity, 'jumpDust');
                        pressedAnotherButton = true;
                        console.log("Player jumped!");
                        AUDIO_MANAGER.playOnce("Jump");
                        jumpCounter = jumpCooldown;
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


            }
        }

    }
}