class RenderSystem {
    update(deltaTime, game) {

        game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height); //clear whole screen

        for (let entity of game.entities) {

            if (entity.position) {

                if (entity.sprite) {
                    game.ctx.drawImage(
                        entity.sprite.image,
                        entity.sprite.frameX,
                        entity.sprite.frameY,
                        entity.sprite.frameWidth,
                        entity.sprite.frameHeight,
                        entity.position.x,
                        entity.position.y,
                        entity.sprite.frameWidth * entity.sprite.scaleWidth, 
                        entity.sprite.frameHeight * entity.sprite.scaleHeight
                    )

                } else {

                    if (entity.playercontrolled) {
                        //fallback for player
                        game.ctx.fillStyle = 'purple'
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    } else {
                        game.ctx.fillStyle = 'grey';
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    }

                }



                //draw collider hitbox if the debug checkbox is enabled
                const debugEnabled = document.getElementById('debugToggle').checked;
                if (debugEnabled && entity.collider) {
                    const bounds = entity.collider.getBounds(entity.position);

                    game.ctx.save();
                    game.ctx.strokeStyle = 'red';
                    game.ctx.lineWidth = 2;
                    
                    game.ctx.beginPath();
                    game.ctx.rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
                    game.ctx.stroke();
                    game.ctx.restore();
                }
            }
        }

    }
}
