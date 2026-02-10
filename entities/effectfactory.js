// EffectFactory - creates visual effect entities (from zelda demo)
const EFFECT_FACTORY = {
    create(game, sourceEntity) {
        //const { x, y } = sourceEntity.position;
        const type = sourceEntity.effect.type;
        const duration = sourceEntity.effect.duration;
        
        if (type == 'poof') {
            return this.createPoof(game, sourceEntity, duration);
        }
        else if (type == 'dust') {
            return this.createDust(game, sourceEntity, duration);
        }
    },
    
    createPoof(game, entity, duration) {
        const poofAnimations = {
            'poof': {
                frames: [
                    { x: 0, y: 0, width: 16, height: 16 },
                    { x: 16, y: 0, width: 16, height: 16 },
                    { x: 32, y: 0, width: 16, height: 16 },
                    { x: 48, y: 0, width: 16, height: 16 }
                ],
                duration: duration / 4  // Divide total duration by frame count
            }
        };
        
        const poof = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/effect.png"),
                0, 0, 16, 16, 2, 2
            ),
            position: new Position(entity.position.x + entity.collider.offsetX, entity.position.y+ entity.collider.offsetY),
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
                    { x: 0, y: 0, width: 16, height: 16 },
                    { x: 16, y: 0, width: 16, height: 16 },
                    { x: 32, y: 0, width: 16, height: 16 },
                    { x: 48, y: 0, width: 16, height: 16 }
                ],
                duration: duration / 4  // Divide total duration by frame count
            }
        };
        
        const dust = {
            position: new Position(entity.position.x + entity.collider.width, entity.position.y + entity.collider.height+10),
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/effect.png"),
                0, 0, 16, 16, 0.5, 0.5 
            ),
            animator: new Animator(dustAnimations, 'dust'),
            lifetime: new Lifetime(duration)
        };
        
        game.addEntity(dust);
        return dust;
    },
};