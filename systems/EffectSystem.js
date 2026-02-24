class EffectSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            // Check if entity is marked for removal and has death effect
            if (entity.removeFromWorld && entity.effect) {
                // Spawn the effect
                EFFECT_FACTORY.create(game, entity, 'poof');
            }

            //spawn dust if statue
            const deltaX = entity.position.x - entity.position.oldX;
            if ((!entity.playercontrolled && entity.gravity) && Math.abs(deltaX) > 0.1) {
                EFFECT_FACTORY.create(game, entity, 'dust');
            }

            //jumpDust spawned in PlayerInputSystem() 
        }
    }
}