class CollisionSystem {
    update(deltaTime, game) {
        const collidable = game.entities.filter(e => e.position && e.collider);
         //console.log("Collidable entities:", collidable.map(e => e.position));

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


        // Check if entities can even move in the first place, 
        const e1Dynamic = Boolean(e1.velocity);
        const e2Dynamic = Boolean(e2.velocity);

        if (!e1Dynamic && !e2Dynamic) return;

        const mover = e1Dynamic ? e1 : e2;
        const other = mover === e1 ? e2 : e1;

        const bm = mover.collider.getBounds(mover.position);
        const bo = other.collider.getBounds(other.position);

        if (overlapX < overlapY) {
            if (bm.left < bo.left) mover.position.x -= overlapX;
            else mover.position.x += overlapX;
            mover.velocity.dx = 0;
        } else {
            if (bm.top < bo.top) {
                mover.position.y -= overlapY;
                mover.isGrounded = true;
            } else {
                mover.position.y += overlapY;
            }
            mover.velocity.dy = 0;
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
