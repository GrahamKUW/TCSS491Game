class RenderSystem {
    update(deltaTime, game) {



        game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height); //clear whole screen

        for (let entity of game.entities) {
            if (entity.position && entity.sprite) {


                game.ctx.drawImage(
                    entity.sprite.image,
                    entity.sprite.frameX,
                    entity.sprite.frameY,
                    entity.sprite.frameWidth,
                    entity.sprite.frameHeight,
                    entity.position.x,
                    entity.position.y,
                    entity.sprite.frameWidth * 3, //doubling size for visiblity
                    entity.sprite.frameHeight * 3
                )

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

}
