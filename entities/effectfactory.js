// EffectFactory - creates visual effect entities
const EFFECT_FACTORY = {
    create(game, sourceEntity, effect) {
        const type = effect;
        const duration = sourceEntity.effect.duration;
        
        if (type == 'poof') {
            return this.createPoof(game, sourceEntity, duration);
        }
        else if (type == 'dust') {
            return this.createDust(game, sourceEntity, duration);
        }
        else if (type == 'jumpDust') {
            return this.createJumpDust(game, sourceEntity, 0.35); // <- by getting from source entity we cant change the individual timings. This is a temporary fix.
        }
        else if (type == 'collect') {
            return this.createCollect(game, sourceEntity, duration);
        }
    },
    
    createPoof(game, entity, duration) {
        const poofAnimations = {
            'poof': {
                frames: [
                    { x: 0, y: 0, width: 32, height: 32 },
                    { x: 32, y: 0, width: 32, height: 32 },
                    { x: 64, y: 0, width: 32, height: 32 },
                    { x: 96, y: 0, width: 32, height: 32 },
                    { x: 128, y: 0, width: 32, height: 32 },
                    { x: 160, y: 0, width: 32, height: 32 },
                    { x: 192, y: 0, width: 32, height: 32 },
                    { x: 224, y: 0, width: 32, height: 32 },
                    { x: 256, y: 0, width: 32, height: 32 }
                ],
                duration: duration / 9,  // Divide total duration by frame count
                loops: false
            }
        };
        
        const poof = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/SmokeExplosion.png"),
                0, 0, 32, 32, 2, 2 // <- does not scale respective to tilemap size for autoscaling
            ),
            position: new Position(entity.position.x + entity.collider.offsetX - 16, entity.position.y+ entity.collider.offsetY - 8), // <- Not automatically positioning with respect to scale this is a temp fix
            animator: new Animator(poofAnimations, 'poof'),
            lifetime: new Lifetime(duration)
        };
        game.addEntity(poof);
        return poof;
    },

    createDust(game, entity, duration) {
        const dustAnimations = {
            'dust': {
                frames: [
                    { x: 0, y: 0, width: 32, height: 32 },
                    { x: 32, y: 0, width: 32, height: 32 },
                    { x: 64, y: 0, width: 32, height: 32 },
                    { x: 96, y: 0, width: 32, height: 32 },
                    { x: 128, y: 0, width: 32, height: 32 },
                    { x: 160, y: 0, width: 32, height: 32 },
                    { x: 192, y: 0, width: 32, height: 32 },
                    { x: 224, y: 0, width: 32, height: 32 },
                    { x: 256, y: 0, width: 32, height: 32 }
                ],
                duration: duration / 9,  // Divide total duration by frame count
                loops: false
            }
        };

        let dustOffset = entity.position.x > entity.position.oldX ? entity.collider.width * 1.5 : entity.collider.width * 0.5;
        const dust = {
            position: new Position(entity.position.x + dustOffset, entity.position.y + entity.collider.height+10),
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/SmokeExplosion.png"),
                0, 0, 32, 32, 0.25, 0.25 
            ),
            animator: new Animator(dustAnimations, 'dust'),
            lifetime: new Lifetime(duration)
        };
        
        game.addEntity(dust);
        return dust;
    },

    createJumpDust(game, entity, duration) {

        if (entity.jumpDustActive) return;
        entity.jumpDustActive = true;

        const jumpDustAnimations = {
            'jumpDust': {
                frames: [
                    { x: 0, y: 0, width: 32, height: 32 },
                    { x: 32, y: 0, width: 32, height: 32 },
                    { x: 64, y: 0, width: 32, height: 32 },
                    { x: 96, y: 0, width: 32, height: 32 },
                    { x: 128, y: 0, width: 32, height: 32 },
                ],
                duration: duration / 5,  // Divide total duration by frame count
                loops: false
            }
        };

        //let dustOffset = entity.position.x > entity.position.oldX ? entity.collider.width * 1.5 - 8 : entity.collider.width * 0.5 + 8;
        const jumpDust = {
            position: new Position(entity.position.x + 8, entity.position.y + 16), // <- Not automatically positioning with respect to scale this is a temp fix
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/JumpDust.png"),
                0, 0, 32, 32, 1.5, 1.5 // < - Changed to be smaller, still should be function of tilemap size for autoscaling
            ),
            animator: new Animator(jumpDustAnimations, 'jumpDust'),
            lifetime: new Lifetime(duration),

            onRemove: () => {
                entity.jumpDustActive = false;
            }   
        };
        
        game.addEntity(jumpDust);
        return jumpDust;
    },

    createCollect(game, entity, duration) {
        const collectAnimations = {
            'collect': {
                frames: [
                    { x: 0, y: 0, width: 32, height: 32 },
                    { x: 32, y: 0, width: 32, height: 32 },
                    { x: 64, y: 0, width: 32, height: 32 },
                    { x: 96, y: 0, width: 32, height: 32 },
                    { x: 128, y: 0, width: 32, height: 32 },
                    { x: 160, y: 0, width: 32, height: 32 },
                    { x: 192, y: 0, width: 32, height: 32 }
                ],
                duration: duration / 7,  // Divide total duration by frame count
                loops: false
            }
        };
        
        const collect = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/CircleExpand.png"),
                0, 0, 32, 32, 2, 2 
            ),
            position: new Position(entity.position.x, entity.position.y),
            animator: new Animator(collectAnimations, 'collect'),
            lifetime: new Lifetime(duration)
        };
        game.addEntity(collect);
        return collect;
    },
};