function createExitDoor(x, y, id, width = 32, height = 20, offsetX = 0, offsetY = 12, scaleWidth = 1, scaleHeight = 1, targetLevel = "prototype_level") {


    const triggerWhiteList =  ["playercontrolled"]; //only the player can trigger the exit door's trigger, not every entity with cantrigger.

    const entity = {
        position: new Position(x,y),
        trigger: new Trigger(width, height, offsetX, offsetY, id, triggerWhiteList),
        levelchange: new LevelChange(id, targetLevel),
        sprite: new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/ExitEntrance.png"), 0, 0, 32, 32, scaleWidth , scaleHeight),
    }

    return entity;
}