class CollisionSystem {
    update(deltaTime, game) {
        const collidable = game.entities.filter(e => e.position && e.collider);
        // console.log("Collidable entities:", collidable.map(e => e.position));

        


        for (let i = 0; i < collidable.length; i++) {
            for (let j = i + 1; j < collidable.length; j++) {
                const e1 = collidable[i];
                const e2 = collidable[j];

                if (this.aabbCollision(e1, e2)) {
                    this.resolveCollision(e1, e2);
                }
            }
        }
    }


    resolveCollision(e1, e2) {
        //just push them away for now
        const b1 = e1.collider.getBounds(e1.position);
        const b2 = e2.collider.getBounds(e2.position);

        // console.log("collision!" + e1  + e2);


        const overlapX = Math.min(b1.right - b2.left, b2.right - b1.left);
        const overlapY = Math.min(b1.bottom - b2.top, b2.bottom - b1.top);


        if (overlapX < overlapY) {
            // move on X axis
            if (b1.left < b2.left) e1.position.x -= overlapX;
            else e1.position.x += overlapX;
            e1.velocity.dx = 0;
        } else {
            // move on Y axis
            if (b1.top < b2.top) e1.position.y -= overlapY;
            else e1.position.y += overlapY;
            e1.velocity.dy = 0;
        }
    }

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
}
