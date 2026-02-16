function createExitDoor(x, y, id, width = 32, height = 20, offsetX = 0, offsetY = 12, targetLevel = "prototype_level") {

    const entity = {
        position: new Position(x,y),
        trigger: new Trigger(width, height, offsetX, offsetY, id),
        levelchange: new LevelChange(id, targetLevel),
    }

    return entity;
}