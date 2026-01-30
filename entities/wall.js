//TODO: add sprite for this once render system is added.

function createWall(x, y, colliderWidth, colliderHeight) {

    const entity = {
        removeFromWorld: false,
        position: new Position(x, y),
        collider: new Collider(colliderWidth, colliderHeight),
        static: new Static(),
    }
    return entity;
}