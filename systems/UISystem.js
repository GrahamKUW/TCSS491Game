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

        //mute if muted
        AUDIO_MANAGER.setMuted(document.getElementById('muteToggle').checked)
        
        if (CURRENT_LEVEL != "prototype_level" && CURRENT_LEVEL != "endscreen_level"){

            // Show current level name
            let levelString = game.currentLevel.replace('_', ' ');

            if (levelString != "final level") {
                ctx.fillText(levelString, 150, 40);
                ctx.strokeText(levelString, 150, 40);
            }

            //Show current Yarn collected
            if (levelString != "final level") {
                ctx.drawImage(ASSET_MANAGER.getAsset("./assets/sprites/YarnBall.png"), 0, 0, 32, 32,
                900, 24, 64, 64);
                let yarnString = ": " + game.yarnCollected;
                ctx.fillText(yarnString, 948, 40)
                ctx.strokeText(yarnString, 948, 40);
            }

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

        else if (CURRENT_LEVEL == "endscreen_level") { //print end screen UI

            // Set up UI styling
            ctx.fillStyle = rgb(166, 171, 255);
            ctx.strokeStyle = "#000000"; // Black outline
            ctx.lineWidth = 1; 
            ctx.font = '20px "Press Start 2P"';
            ctx.textBaseline = 'top';

            //print credits
            let red2String = "Congratulations! You Escaped the Dungeon!";
            let kavonString = "- Character/Environment Design, Pixel Art, Level Design";
            let robbieString = "- Level Design, Enemy Design, Pixel Art";
            let seanString = "- Collisions/Trigger Programming, Systems Programming";
            let gusString = "- UI Design, Music, Level Design";

            ctx.fillText(red2String, 100, 160);
            ctx.strokeText(red2String, 100, 160);
            ctx.fillText("A game made by: ", 100, 200);
            ctx.strokeText("A game made by: ", 100, 200);

            ctx.fillText("Kavon Graham ", 100, 235);
            ctx.strokeText("Kavon Graham ", 100, 235);
            ctx.fillText(kavonString, 100, 260);
            ctx.strokeText(kavonString, 100, 260);

            ctx.fillText("Robbie Allen ", 100, 310);
            ctx.strokeText("Robbie Allen ", 100, 310);
            ctx.fillText(robbieString, 100, 335);
            ctx.strokeText(robbieString, 100, 335);

            ctx.fillText("Sean Miller ", 100, 385);
            ctx.strokeText("Sean Miller ", 100, 385);
            ctx.fillText(seanString, 100, 410);
            ctx.strokeText(seanString, 100, 410);

            ctx.fillText("Gus Kiritz", 100, 460);
            ctx.strokeText("Gus Kiritz ", 100, 460);
            ctx.fillText(gusString, 100, 485);
            ctx.strokeText(gusString, 100, 485);


            //print yarn collected
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/sprites/YarnBall.png"), 0, 0, 32, 32,
                200, 535, 64, 64);
                let yarnString = ": " + game.yarnCollected + "/20";
                ctx.fillText(yarnString, 248, 555);
                ctx.strokeText(yarnString, 248, 555);

            if(game.yarnCollected >= 20) { //unlocked secret levels
                ctx.fillText("All Yarn Collected: NEW LEVELS UNLOCKED!", 160, 590);
                ctx.strokeText("All Yarn Collected: NEW LEVELS UNLOCKED!", 160, 590);
                if(!game.unlockedSecretLevels) {
                    AUDIO_MANAGER.playOnce("Win");
                }
                game.addEntity(createWall(160, 590, 770, 20));
                game.unlockedSecretLevels = true;
            }

            //create home button
            gameEngine.addEntity(createMenuButton(1050, 550, "home"))

        }
    }
}