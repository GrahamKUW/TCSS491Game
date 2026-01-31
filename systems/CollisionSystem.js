/**  Collision System for the game, should be run after movement and before render systems, and should be added to the 
* game engine via a call to addSystem. It is a AABB (Axis Aligned Bounding Box) collision system.
*
* Checks for all entities with a position and collider component attached and handles collisions on them.
* Also handles players grounded state.
* Entities that do not move ever should have the static component attached to them for optimization.
*
* @param {*} deltaTime - the time since the last update occured.
* @param {*} game - the game this system is running on.
* @returns {void}
*
*/

class CollisionSystem {
    update(deltaTime, game) {
        const collidable = game.entities.filter(e => e.position && e.collider);
        const COLLISION_ITERATIONS = 5; //running multiple times helps stutter

        // set the players grounded state to false
        for (const e of collidable) {
            if (e.playercontrolled) {
                e.playercontrolled.isGrounded = false;
            }
        }
<<<<<<< Updated upstream
        
        //list of entity collisions
        for (const e of collidable) {
            e.collisions = [];
        }

=======
>>>>>>> Stashed changes

        for (let k = 0; k < COLLISION_ITERATIONS; k++) {
            for (let i = 0; i < collidable.length; i++) {
                for (let j = i + 1; j < collidable.length; j++) {
                    const e1 = collidable[i];
                    const e2 = collidable[j];

                    if (e1.static && e2.static) {
                        continue; // static and static collisions shouldn't happen, they both aren't moving
                    }
                    if (this.aabbCollision(e1, e2)) {
<<<<<<< Updated upstream
                        console.log("collision: " + e1.position.x + " e2: " + e2.position.x);

                        // record collision
                        e1.collisions.push(e2);
                        e2.collisions.push(e1);
=======
                        //console.log("collision: " + e1.position.x + " e2: " + e2.position.x);
>>>>>>> Stashed changes
                        this.resolveCollision(e1, e2);
                    }
                }
            }
        }
    }

    /** 
    * Resolves collisions between two entities. 
    * @param {*} e1 - the first entity
    * @param {*} e2 - the second entity
    * @returns {void}
    */
    resolveCollision(e1, e2) {
        const e1Static = Boolean(e1.static);
        const e2Static = Boolean(e2.static);
        const bothDynamic = !e1Static && !e2Static;

        //find bounds
        const e1Bounds = e1.collider.getBounds(e1.position);
        const e2Bounds = e2.collider.getBounds(e2.position);

        //find overlap
        const overlapX = Math.min(e1Bounds.right - e2Bounds.left, e2Bounds.right - e1Bounds.left);
        const overlapY = Math.min(e1Bounds.bottom - e2Bounds.top, e2Bounds.bottom - e1Bounds.top);

        if (overlapX < overlapY) {
            //horizontal collision
            let xPush = overlapX;
            //Halve push strength if both are dynamic since it will be shared between them 
            if (bothDynamic) {
                xPush = xPush / 2;
            }

            //e1 is left of e2
            if (e1Bounds.left < e2Bounds.left) {
                if (!e1Static) {
                    e1.position.x -= xPush;
                }
                if (!e2Static) {
                    e2.position.x += xPush;
                }
            } else { //e1 is right of e2
                if (!e1Static) {
                    e1.position.x += xPush;
                }
                if (!e2Static) {
                    e2.position.x -= xPush;
                }
            }

            //reset horizontal velocities of colliding entities if they have them
            if (!e1Static && e1.velocity) {
                e1.velocity.dx = 0;
            }
            if (!e2Static && e2.velocity) {
                e2.velocity.dx = 0;
            }

        } else {
            //vertical collisions
            let yPush = overlapY;
            if (bothDynamic) {
                yPush = yPush / 2;
            }

            if (e1Bounds.top < e2Bounds.top) { //e1 is on top of e2 

                if (!e1Static) {
                    e1.position.y -= yPush;

                    if (e1.velocity && e1.velocity.dy > 0) {
                        //if e1 fell on top, reset its velocity
                        e1.velocity.dy = 0;
                    }

                    // set player grounded state
                    if (e1.playercontrolled) {
                        e1.playercontrolled.isGrounded = true;
                    }
                }

                if (!e2Static && bothDynamic) {
                    e2.position.y += yPush;
                    if (e2.velocity.dy < 0) {
                        e2.velocity.dy = 0;
                    }
                }

            } else {
                //e2 on top of e1
                if (!e2Static) {
                    e2.position.y -= yPush;

                    if (e2.velocity && e2.velocity.dy > 0) {
                        //if e1 fell on top, reset its velocity
                        e2.velocity.dy = 0;
                    }

                    // set player grounded state
                    if (e2.playercontrolled) {
                        e2.playercontrolled.isGrounded = true;
                    }
                }
                
                if (!e1Static && bothDynamic) {
                    e1.position.y += yPush;

                    if (e1.velocity.dy < 0) {
                        e1.velocity.dy = 0;
                    }
                }
            }
        }
    }

    /**
     * Detects if a collision has occurred between two entities with collider and position components
     * @param {*} e1 the first entity to check
     * @param {*} e2 the second entity to check
     * @returns true if a collision has occured, false otherwise
     */
    aabbCollision(e1, e2) {
        const b1 = e1.collider.getBounds(e1.position);
        const b2 = e2.collider.getBounds(e2.position);

        return (
            b1.left < b2.right &&
            b1.right > b2.left &&
            b1.top < b2.bottom &&
            b1.bottom > b2.top
        );
    }
}