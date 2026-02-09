/**
 * Test factory function to make an trigger box for something, used for ghost blocks right now.
 * @param {*} x The x position of the trigger
 * @param {*} y The Y position of the trigger
 * @param {*} width The width position of the trigger
 * @param {*} height The height position of the trigger
 * @param {*} offsetX The x offset of the trigger 
 * @param {*} offsetY The y offset of the trigger 
 * @param {*} id The id of the trigger, make sure that whatever you want to respond to the trigger has the same 
 * id as the trigger itself
 * @returns An entity with position and trigger components.
 */
function createGhostTrigger(x, y, width = 16, height = 16, offsetX = 0, offsetY = 0, id) {

    const entity = {
        position: new Position(x,y),
        trigger: new Trigger(width, height, offsetX, offsetY, id),
    }

    return entity;
}