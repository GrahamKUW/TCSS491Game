class RenderSystem {
    update(deltaTime, game) {



        game.ctx.clearRect(0,0, game.ctx.canvas.width, game.ctx.canvas.height); //clear whole screen

        // game.ctx.save();
        // game.ctx.translate(0, 288); //why?

        for (let entity of game.entities) {
            if (entity.position) {
                if (entity.sprite) {
                    //draw sprite
                } else {

                    if (entity.playercontrolled) {
                        //fallback for player
                        game.ctx.fillStyle = 'purple'
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    } else {
                        //falback, square
                        game.ctx.fillStyle = 'grey';
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    }

                }
            }
        }

        // game.ctx.restore();
    }
}