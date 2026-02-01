class AnimationSystem {
    update(deltaTime, game) {

        for (let entity of game.entities) {
            if (entity.animator && entity.sprite) {

                this.updateAnimation(entity);
                this.updateFrames(entity, deltaTime);

            }
        }
    }


    //checks to see if the new anim is the same as the current
    resetIfNew(entity, newAnim) {
        if (entity.animator.currentAnimation !== newAnim) {
           entity.animator.currentAnimation = newAnim;
           entity.animator.currentFrame = 0;
           entity.animator.frameTimer = 0; 
        }
    }


    updateAnimation(entity) {
        if (entity.facing && entity.velocity) {

            const isMoving = entity.velocity.dx !== 0 || entity.velocity.dy !== 0;
            const direction = entity.facing.direction;


            //choose between idle and walking animation 
            let newAnim = isMoving ? `walk-${direction}` : `idle-${direction}`;

            if (entity.playercontrolled) {
                if (!entity.playercontrolled.isGrounded) {
                    newAnim = `jump-${direction}`;
                }
            }

            //only change to a new animation if this is not the current one.

            this.resetIfNew(entity, newAnim);
        }
    }


    updateFrames(entity, deltaTime) {
        const anim = entity.animator.animations[entity.animator.currentAnimation];
        if (!anim) return;


        if (anim.frames.length === 1) {
            const frame = anim.frames[0];
            entity.sprite.frameX = frame.x;
            entity.sprite.frameY = frame.y;

            if (frame.width !== undefined) entity.sprite.frameWidth = frame.width;
            if (frame.height !== undefined) entity.sprite.frameHeigh = frame.height;
            return;
        }

        //update timer
        entity.animator.frameTimer += deltaTime;

        //update frame if timer passed duration
        if (entity.animator.frameTimer >= anim.duration) {
            entity.animator.frameTimer = 0;
            entity.animator.currentFrame = (entity.animator.currentFrame + 1) % anim.frames.length;
        }

        //update sprite to show current frame (sprite will be drawn by RenderSystem)
        const frame = anim.frames[entity.animator.currentFrame];
        entity.sprite.frameX = frame.x;
        entity.sprite.frameY = frame.y;
        //update sprite dimensions if specified in frame
        if (frame.width !== undefined) entity.sprite.frameWidth = frame.width;
        if (frame.height !== undefined) entity.sprite.frameHeight = frame.height;
    }
}