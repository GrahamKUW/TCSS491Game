/*
System for displaying spikes based on direction and implementing falling spike trap if facing 'down'
*/
class TrapSystem{

    update (deltaTime, game) {
        const speed = 350;
        const returnDelay = 1.0; // 1 second

        for (let entity of game.entities) {
            //filter down to only spikes
            if (!entity.facing || !entity.trigger) continue;

            if(entity.trigger.active == true) {
                
                entity.waitingToReturn = true;
                entity.returnDelayTimer = 0;

                if(entity.facing.direction == 'up') {
                    entity.velocity.dy = -speed;
                } else if (entity.facing.direction == 'down') {
                    entity.velocity.dy = speed;
                } else if (entity.facing.direction == 'left') {
                    entity.velocity.dx = -speed;
                } else if (entity.facing.direction == 'right') {
                    entity.velocity.dx = speed;
                }
            }
            // inactive
            else {

                // if trap is not at start position, count delay
                if (entity.position.x !== entity.position.startX ||
                    entity.position.y !== entity.position.startY) {

                    entity.returnDelayTimer += deltaTime;

                    // WAIT during delay
                    if (entity.returnDelayTimer < returnDelay) {

                        entity.velocity.dx = 0;
                        entity.velocity.dy = 0;
                        continue;
                    }
                }

                // RETURN AFTER DELAY
                if(entity.facing.direction == 'up') {

                    if (entity.position.y >= entity.position.startY) {

                        entity.velocity.dx = 0;
                        entity.velocity.dy = 0;
                        entity.position.x = entity.position.startX;
                        entity.position.y = entity.position.startY;
                        entity.returnDelayTimer = 0;

                    } else {
                        entity.velocity.dy = speed/2;
                    }

                }

                else if (entity.facing.direction == 'down') {

                    if (entity.position.y <= entity.position.startY) {

                        entity.velocity.dx = 0;
                        entity.velocity.dy = 0;
                        entity.position.x = entity.position.startX;
                        entity.position.y = entity.position.startY;
                        entity.returnDelayTimer = 0;

                    } else {
                        entity.velocity.dy = -speed/2;
                    }

                }

                else if (entity.facing.direction == 'left') {

                    if (entity.position.x >= entity.position.startX) {

                        entity.velocity.dx = 0;
                        entity.velocity.dy = 0;
                        entity.position.x = entity.position.startX;
                        entity.position.y = entity.position.startY;
                        entity.returnDelayTimer = 0;

                    } else {
                        entity.velocity.dx = speed/2;
                    }

                }

                else if (entity.facing.direction == 'right') {

                    if (entity.position.x <= entity.position.startX) {

                        entity.velocity.dx = 0;
                        entity.velocity.dy = 0;
                        entity.position.x = entity.position.startX;
                        entity.position.y = entity.position.startY;
                        entity.returnDelayTimer = 0;

                    } else {
                        entity.velocity.dx = -speed/2;
                    }

                }

            }
        }
    }
}