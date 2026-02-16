/**
 * button factory function based off of ghost trigger.
 * @param {*} x The x position of the button
 * @param {*} y The Y position of the button
 * @param {*} width The width position of the trigger
 * @param {*} height The height position of the trigger
 * @param {*} offsetX The x offset of the trigger
 * @param {*} offsetY The y offset of the trigger 
 * @param {*} id The id of the trigger, make sure that whatever you want to respond to the trigger has the same 
 * id as the trigger itself
 * @returns A button entity with position and trigger components.
 */
function createButton(x, y, id, width = 32, height = 20, offsetX = 0, offsetY = 12) {

    const inactiveSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/button.png"), 0, 0, 16, 16, 2, 2);
    const activeSprite = new Sprite(ASSET_MANAGER.getAsset("./assets/sprites/button.png"), 16, 0, 16, 16, 2, 2);

    const entity = {
        position: new Position(x,y),
        sprite: inactiveSprite,
        trigger: new Trigger(width, height, offsetX, offsetY, id),
        togglesprite: new ToggleSprite(activeSprite, inactiveSprite, id),
    }

    return entity;
}