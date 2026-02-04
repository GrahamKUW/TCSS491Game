class DeathSystem {
    update(deltaTime, game) {
        for (let entity of game.entities) {
            if (entity.destructible) {
                for (const other of entity.collisions) {
                    //kill when crushed by statue
                    if (!other.playercontrolled && other.position.y + other.collider.height <= entity.position.y + 1) {
                        entity.removeFromWorld = true;
                        break;
                    }
                } 
            }
            
            if(entity.playercontrolled) {
                for (const other of entity.collisions) {
                    if (other.hazard) { //kills player
                        this.respawnPlayer(entity, game);
                        break;
                    }
                }
            }           
        }
    }

    respawnPlayer(entity) {
        entity.position.x = entity.playercontrolled.respawnX;
        entity.position.y = entity.playercontrolled.respawnY;
        entity.velocity.dx = 0;
        entity.velocity.dy = 0;
    }
}