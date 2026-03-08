let alreadyDying = false;

class DeathSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {

            if (entity.destructible && entity.collisions) {
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
                        console.log("Entity crushed!");
                        if(entity.isRat){
                            AUDIO_MANAGER.playOnce("Rat_Kill");
                        }
                        else{
                            AUDIO_MANAGER.playOnce("Crate_Destroy");
                        }
                        entity.removeFromWorld = true;

                        break;
                    }
                    if(other.hazard && !other.destructible) {
                        console.log("Entity killed by hazard!");

                        if(entity.isRat){
                            AUDIO_MANAGER.playOnce("Rat_Kill");
                        }
                        else{
                            AUDIO_MANAGER.playOnce("Crate_Destroy");
                        }
                        entity.removeFromWorld = true;

                        
                        break;
                    }
                } 
            }
            else if (entity.playercontrolled && entity.collisions && !alreadyDying) {
                for (const other of entity.collisions) {
                    if (other.hazard) { //kills player
                        console.log("Player died to hazard!");
                        AUDIO_MANAGER.playOnce("Death");

                        EFFECT_FACTORY.create(game, entity, 'poof');
                        game.inputBlockDuration = 0.6125;

                        entity.position = new Position(entity.position.x, 50000); // just teleport it out of sight

                        alreadyDying = true;
                        screenWipeOut(game, () => {
                            respawnPlayer(entity);
                            screenWipeIn(game, () => {
                                alreadyDying = false;
                            }, true, 0.0125/2);
                        }, true, 0.0125/2);
                        
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