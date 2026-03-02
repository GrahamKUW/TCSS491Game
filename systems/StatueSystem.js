class StatueSystem {
    update(deltaTime, game) {

        for (let entity of game.entities) {
            //filter down to only players
            if (!entity.playercontrolled || !entity.statueable) continue;

            if (entity.statueable.timer > 0) {
                entity.statueable.timer -= deltaTime;
            }

            if ((game.keys['e'] || game.keys['p']) && entity.statueable.timer <= 0) {

                if (entity.playercontrolled.lives > 1) {
                    //spawn a statue where the player is
                    game.addEntity(createStatue(entity.position.x, entity.position.y));
                    entity.statueable.timer = entity.statueable.cooldown;
                    
                    EFFECT_FACTORY.create(game, entity, 'poof'); 
                    console.log("Player turned into a statue!");
                    respawnPlayer(entity);
                }
            }
        }
    }
}