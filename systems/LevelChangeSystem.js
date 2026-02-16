class LevelChangeSystem { 
    update(deltaTime, game) {
        /**
         * Search for everything with a level transition component, check if the associated trigger is active, 
         * try and load the level.
         */

        const activeTriggerIDs = game.entities.filter(e => e.trigger && e.trigger.active).map(e => e.trigger.id);

        const levelExits = game.entities.filter(e => e.levelchange);

        console.log(levelExits);

        for (const l of levelExits) {
            if (activeTriggerIDs.includes(l.levelchange.triggerID)) {
                console.log("Loading!");
                loadLevel(l.levelchange.targetLevel);
            }
        }
    }
}