class PlayerInputSystem {
    update(deltaTime, game) {


        for (let entity of game.entities) {
            if (entity.position && entity.velocity && entity.playercontrolled) {
                


                //reset their velocity(so they dont move if they arent pressing anything)
//TODO: temporary to keep them on screen
                if(entity.position.y > 400) {
                    entity.velocity.dy = 0;
                }
                //entity.velocity.dy = 0; unremoved since gravity ups it.
                entity.velocity.dx = 0;


                const speed = entity.playercontrolled.speed;

                //check which direction the player is moving
                if (game.keys['ArrowUp'] || game.keys['w']) {
                    entity.velocity.dy = -speed;
                }

                if (game.keys['ArrowDown'] || game.keys["s"]) {
                    entity.velocity.dy = speed;
                }

                if (game.keys['ArrowLeft'] || game.keys['a']) {
                    entity.velocity.dx = -speed;
                }

                if (game.keys['ArrowRight'] || game.keys['d']) {
                    entity.velocity.dx = speed;
                }







                console.log(game.keys);
                console.log(entity.position.y);

            }
        }

    }
}