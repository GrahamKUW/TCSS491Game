/*
System for drawing UI elements seperately from the rest of the game elements??
*/

class UISystem{
    update (deltaTime, game) {

        const ctx = game.ctx;

        // Set up UI styling
        ctx.fillStyle = rgb(166, 171, 255);
        ctx.strokeStyle = "#000000"; // Black outline
        ctx.lineWidth = 2; 
        ctx.font = '32px "Press Start 2P"';
        ctx.textBaseline = 'top';

        // Show current level name
        let levelString = game.currentLevel.replace('_', ' ');

        if (levelString != "final level") {
            ctx.fillText(levelString, 150, 40);
            ctx.strokeText(levelString, 150, 40);
        }
        

        //Show current Yarn collected
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/sprites/YarnBall.png"), 0, 0, 32, 32,
         900, 24, 64, 64);
        let yarnString = ": " + game.yarnCollected;
        ctx.fillText(yarnString, 948, 40)
        ctx.strokeText(yarnString, 948, 40);
        

        let isAlive = false;
        for (let entity of game.entities) {
            //filter down to only players for getting life counter

            if(entity.isUserInterface && entity.sprite !== null && entity.sprite !== undefined){

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

            if (!entity.playercontrolled || !entity.statueable) continue;
            isAlive = true;
            ctx.drawImage(
                ASSET_MANAGER.getAsset("./assets/sprites/Lives.png"), 0, entity.playercontrolled.lives * 32, 114, 32,
                524, 24, 228, 64
            );
        }
        if (!isAlive) {
            const ctx = game.ctx;
            ctx.drawImage(
                ASSET_MANAGER.getAsset("./assets/sprites/Lives.png"), 0, 0, 114, 32,
                524, 24, 228, 64
            );
        }
        
    }
}