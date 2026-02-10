class EffectSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            // Check if entity is marked for removal and has death effect
            if (entity.removeFromWorld && entity.effect && !entity.effectSpawned) {
                // Spawn the effect
                EFFECT_FACTORY.create(game, entity);
                
                // Mark that we've spawned the effect to avoid duplicates
                entity.effectSpawned = true;
            }

            //spawn dust if statue
            if ((!entity.playercontrolled && entity.gravity) && entity.position.x != entity.position.oldX) {
                EFFECT_FACTORY.create(game, entity);
            }   
        }
    }
}