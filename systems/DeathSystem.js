class DeathSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.destructible) {
                for (const other of entity.collisions) {
                    //kill when crushed by statue
                    if (!other.playercontrolled && other.position.y + other.collider.height <= entity.position.y + 1) {
                        entity.removeFromWorld = true;
                        console.log("Entity crushed by statue!");
                        break;
                    }
                } 
            }
            else if (entity.playercontrolled) {
                for (const other of entity.collisions) {
                    if (other.hazard) { //kills player
                        console.log("Player died to hazard!");
                        EFFECT_FACTORY.create(game, entity, 'poof');
                        respawnPlayer(entity);
                        break;
                    }
                }
            }
            else if (entity.lifetime) {
                entity.lifetime.elapsed += deltaTime;
                
                // Remove entity if lifetime expired
                if (entity.lifetime.elapsed >= entity.lifetime.duration) {
                    entity.removeFromWorld = true;
                    if (entity.onRemove) {
                        entity.onRemove();
                    }
                }
            }           
        }
    }
}