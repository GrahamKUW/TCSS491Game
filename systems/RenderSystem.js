class RenderSystem {
    update(deltaTime, game) {

        game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height); //clear whole screen

        for (let entity of game.entities) {

            if (entity.position) {

                if (entity.sprite) {
                    
                    // draw as tilemap?
                    if(entity.sprite.tilemapData !== null){
                        const tilemap = entity.sprite.tilemapData.tilemap;
                        const palette = entity.sprite.tilemapData.palette;

                        for (let i = 0; i < tilemap.data.length; i++) {
                            const tileIdx = tilemap.data[i];

                            const tileX = i % tilemap.width;
                            const tileY = Math.floor(i / tilemap.width);
                            
                            if (tileIdx <= 0) {
                                continue;
                            }

                            let posX = entity.position.x + tileX * entity.sprite.frameWidth * entity.sprite.scaleWidth;
                            let posY = entity.position.y + tileY * entity.sprite.frameWidth * entity.sprite.scaleHeight;
                            
                            let pal = palette[tileIdx - 1];
 
                            game.ctx.drawImage(
                                entity.sprite.image,
                                pal.col * entity.sprite.frameWidth,
                                pal.row * entity.sprite.frameHeight,
                                entity.sprite.frameWidth,
                                entity.sprite.frameHeight,
                                posX,
                                posY,
                                entity.sprite.frameWidth * entity.sprite.scaleWidth, 
                                entity.sprite.frameHeight * entity.sprite.scaleHeight
                            )

                        }

                        

                    }
                    else{
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
                    }
                    

                } 
                
                /* else {

                    if (entity.playercontrolled) {
                        //fallback for player
                        game.ctx.fillStyle = 'purple'
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    } else {
                        game.ctx.fillStyle = 'grey';
                        game.ctx.fillRect(entity.position.x, entity.position.y, 64, 64);
                    }

                } */

                //draw collider hitbox if the debug checkbox is enabled
                const debugEnabled = document.getElementById('debugToggle').checked;
                if (debugEnabled && entity.collider) {
                    const bounds = entity.collider.getBounds(entity.position);

                    game.ctx.save();
                    
                    if(entity.hazard){
                        game.ctx.strokeStyle = '#bf1d00'
                    }
                    else{
                        game.ctx.strokeStyle = '#00bf00';
                    }

                    game.ctx.lineWidth = 2;
                    
                    game.ctx.beginPath();
                    game.ctx.rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
                    game.ctx.stroke();
                    game.ctx.restore();
                } else if (debugEnabled && entity.trigger) { /**draw trigger hitbox if debug checkbox is enabled */
                    const bounds = entity.trigger.getBounds(entity.position);

                    game.ctx.save();
                    game.ctx.strokeStyle = '#fff200';
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
