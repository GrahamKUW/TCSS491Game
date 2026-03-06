class DeathSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.destructible) {
                for (const other of entity.collisions) {
                    if(entity.hazard) {
                        let leftX = entity.position.x - 5;
                        let rightX = entity.position.x + entity.collider.width + entity.collider.offsetX + 5
                        let feetY = entity.position.y + entity.collider.height + entity.collider.offsetY -20;
                        entity.leftBlocked = game.getSystem(CollisionSystem).isSolidAt(leftX, feetY, game);
                        entity.rightBlocked = game.getSystem(CollisionSystem).isSolidAt(rightX, feetY, game);
                    }
                    
                    //kill when crushed by statue or spike trap
                    if (!other.playercontrolled && !other.hazard && other.position.y + other.collider.height <= entity.position.y + 1 || (entity.leftBlocked && entity.rightBlocked && !other.hazard)) {
                        entity.removeFromWorld = true;
                        console.log("Entity crushed!");
                        break;
                    }
                    if(other.hazard && !other.destructible) {
                        entity.removeFromWorld = true;
                        console.log("Entity killed by hazard!");
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