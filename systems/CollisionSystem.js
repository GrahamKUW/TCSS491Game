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

        // list of entities collided with
        for (const e of collidable) {
            e.collisions = [];
        }

        // set the players grounded state to false
        for (const e of collidable) {
            if (e.playercontrolled) {
                e.playercontrolled.isGrounded = false;
            }
        }

        for (let k = 0; k < COLLISION_ITERATIONS; k++) {
            for (let i = 0; i < collidable.length; i++) {
                for (let j = i + 1; j < collidable.length; j++) {
                    const e1 = collidable[i];
                    const e2 = collidable[j];

                    if (e1.static && e2.static) {
                        continue; // static and static collisions shouldn't happen, they both aren't moving
                    }
                    if (this.aabbCollision(e1, e2)) {
                        //console.log("collision: " + e1.position.x + " e2: " + e2.position.x);
                        //record collision
                        e1.collisions.push(e2);
                        e2.collisions.push(e1);
                        this.resolveCollision(e1, e2);
                    }
                }
            }
        }
    }

    /** 
    * Resolves collisions between two entities. 
    * They should have positions and collider components at a minimum.
    * @param {*} e1 - The first entity
    * @param {*} e2 - The second entity
    * @returns {void}
    */
    resolveCollision(e1, e2) {
        const e1Static = Boolean(e1.static);
        const e2Static = Boolean(e2.static);
        const bothDynamic = !e1Static && !e2Static;

        //find bounds
        const e1Bounds = e1.collider.getBounds(e1.position);
        const e2Bounds = e2.collider.getBounds(e2.position);

        //find out if either entity is a one way platform
        let onewayCollision = e1.oneway || e2.oneway;

        if (this.shouldResolveCollision(e1, e2)) {
            let axis = this.getResolutionAxis(e1Bounds, e2Bounds, onewayCollision);

            if (axis === "x") {
                this.resolveHorizontalCollision(e1, e2, e1Bounds, e2Bounds, bothDynamic);
            } else {
                this.resolveVerticalCollision(e1, e2, e1Bounds, e2Bounds, bothDynamic);
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

    /**
     * Checks if a collision should be resolved.
     * Used because collisions with one way platforms
     * should not be resolved if the player was under
     * the one way platform on the last tick.
     * @param {*} e1 the first entity to check 
     * @param {*} e2 the second entity to check
     */
    shouldResolveCollision(e1, e2) {
        if (!e1.oneway && !e2.oneway) {
            return true;
        }

        // One of them is one way if we made it here.
        // Currently assuming that two one way platforms can't collide.
        let platform;
        if (e1.oneway) {
            platform = e1;
        } else {
            platform = e2;
        }

        // Find which one is not the platform
        let mover;
        if (platform === e1) {
            mover = e2;
        } else {
            mover = e1;
        }

        // Should only resolve the collision with the one way platform if the moving entity was above the platform last tick
        //  and is falling now.
        return this.isFalling(mover) && this.wasAbove(mover, platform);

    }

    /**
     * Helper function to check if the passed entity is falling.
     * Passed enttiy must have a velocity.
     * @param {*} entity The entity to be checked.
     * @returns true if the entity is falling, false otherwise
     */
    isFalling(entity) {
        return entity.velocity && entity.velocity.dy > 0;
    }


    /**
     * Helper function to check if the passed entity was above
     * the passed platform on the previous tick.
     * @param {*} entity The entity to be checked.
     * @param {*} platform The platform to be checked.
     */
    wasAbove(entity, platform) {
        //find how low the bottom of the entity was last movement system run
        const entityBottom = entity.position.oldY + entity.collider.height; 
        //find the top of the platform
        const platformTop = platform.collider.getBounds(platform.position).top;

        //remember positive y is below so if its less its above
        return entityBottom <= platformTop;
    }

    /**
     * Helper function to get the axis the collision should be resolved on.
     * 
     * @param {*} e1Bounds The boundaries of the first entities collider component.
     * @param {*} e2Bounds The boundaries of the second entities collider component.
     * @param {*} onewayPlatformCollision Forces the resolution axis to be "y" if true, 
     * this is used for oneway platform collisions because they should never be resolve horizontally.
     * @returns 
     */
    getResolutionAxis(e1Bounds, e2Bounds, onewayPlatformCollision){
        const overlapX = Math.min(e1Bounds.right - e2Bounds.left, e2Bounds.right - e1Bounds.left);
        const overlapY = Math.min(e1Bounds.bottom - e2Bounds.top, e2Bounds.bottom - e1Bounds.top);

        if (onewayPlatformCollision) {
            return "y";
        }

        if (overlapX < overlapY) {
            return "x";
        } else {
            return "y";
        }
    }

    /**
     * Resolves horizontal collisions between two entities by pushing them apart.
     * @param {*} e1 The first entity colliding.
     * @param {*} e2 The second entity colliding.
     * @param {*} b1 The bounds of the first entity colliding.
     * @param {*} b2 The bounds of the second entity colliding.
     * @param {*} bothDynamic bool for if both entities colliding are dynamic.
     */
    resolveHorizontalCollision(e1, e2, b1, b2, bothDynamic) {
        let xPush = Math.min(b1.right - b2.left, b2.right - b1.left);
        // Push both with half strength
        if (bothDynamic) {
            xPush = xPush / 2;
        }

         //e1 is left of e2
        if (b1.left < b2.left) {
            if (!e1.static) {
                e1.position.x -= xPush;
            }
            if (!e2.static) {
                e2.position.x += xPush;
            }
        } else { //e1 is right of e2
            if (!e1.static) {
                e1.position.x += xPush;
            }
            if (!e2.static) {
                e2.position.x -= xPush;
            }
        }

        //reset horizontal velocities of colliding entities if they have them
        if (e1.velocity) {
            e1.velocity.dx = 0;
        }
        if (e2.velocity) {
            e2.velocity.dx = 0;
        }
    }

    /**
     * Resolves Vertical collisions between two entities by pushing them apart.
     * @param {*} e1 The first entity colliding.
     * @param {*} e2 The second entity colliding.
     * @param {*} b1 The bounds of the first entity colliding.
     * @param {*} b2 The bounds of the second entity colliding.
     * @param {*} bothDynamic bool for if both entities colliding are dynamic.
     */
    resolveVerticalCollision(e1, e2, b1, b2, bothDynamic) {
        const overlapY = Math.min(b1.bottom - b2.top, b2.bottom - b1.top);
        let yPush = overlapY;
        if (bothDynamic) {
            yPush = yPush / 2;
        }

        if (b1.top < b2.top) { //e1 is on top of e2 
            if (!e1.static) {
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

            if (!e2.static) { // && bothDynamic) {
                e2.position.y += yPush;
                if (e2.velocity.dy < 0) {
                    e2.velocity.dy = 0;
                }
            }

        } else {
            //e2 on top of e1
            if (!e2.static) {
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
            
            if (!e1.static) {
                e1.position.y += yPush;

                if (e1.velocity.dy < 0) {
                    e1.velocity.dy = 0;
                }
            }
        }
    }

    isSolidAt(x, y, game) {

        let solid = false;
        for (let entity of game.entities) {
            if (entity.collider) {
                if (x >= entity.collider.getBounds(entity.position).left && x <= entity.collider.getBounds(entity.position).right
                    && y >= entity.collider.getBounds(entity.position).top && y <= entity.collider.getBounds(entity.position).bottom) {
                    solid = true;
                }
            }
        }
        return solid;
    }

}