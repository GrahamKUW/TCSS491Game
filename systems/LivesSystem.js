/*
System for drawing UI elements seperately from the rest of the game elements??
*/

class LivesSystem{
    update (deltaTime, game) {
        let isAlive = false;
        for (let entity of game.entities) {
            //filter down to only players for getting life counter
            if (!entity.playercontrolled || !entity.statueable) continue;
            isAlive = true;
            const ctx = game.ctx;
            ctx.drawImage(
                ASSET_MANAGER.getAsset("./assets/sprites/Lives.png"), 0, entity.playercontrolled.lives * 32, 114, 32,
                524, 24, 228, 64
            );
            ctx.fillText("This is a test", 30, 300);
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