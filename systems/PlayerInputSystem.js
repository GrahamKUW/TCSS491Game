class PlayerInputSystem {
    update(deltaTime, game) {


        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.playercontrolled) {
                
                //entity.velocity.dy = 0; unremoved since gravity alters it.
                entity.velocity.dx = 0;

                const speed = entity.playercontrolled.speed;

                //check which direction the player is moving
                if (game.keys['ArrowUp'] || game.keys['w']) {
                    entity.velocity.dy = -speed;
                }

                if (game.keys['ArrowLeft'] || game.keys['a']) {
                    entity.velocity.dx = -speed;
                }

                if (game.keys['ArrowRight'] || game.keys['d']) {
                    entity.velocity.dx = speed;
                }



            }
        }

    }
}