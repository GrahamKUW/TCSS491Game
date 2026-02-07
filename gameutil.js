/**
 * Takes a life from the player and attempts to respawn the player at their respawn coordinates.
 * Sets the playerEntitys removeFromWorld property to be true if this was their last life.
 * Logs the players amount of lives in the console if debug is checked.
 * @param {*} playerEntity The player entity, which
 * must have playercontrolled, velocity, and position components.
 */
const respawnPlayer = (playerEntity) => {
    if (!playerEntity.playercontrolled || !playerEntity.velocity || !playerEntity.position) {
        throw new TypeError("Invalid entity passed to respawnplayer, missing a required component: "
             + playerEntity);
    }

    const debugEnabled = document.getElementById('debugToggle').checked;
    playerEntity.playercontrolled.lives -= 1;

    if (debugEnabled) {
        console.log("Player Respawned! lives = " + playerEntity.playercontrolled.lives);
    }

    if (playerEntity.playercontrolled.lives > 0) {
        playerEntity.position.x = playerEntity.playercontrolled.respawnX;
        playerEntity.position.y = playerEntity.playercontrolled.respawnY;
        playerEntity.velocity.dx = 0;
        playerEntity.velocity.dy = 0;
    } else  {
       //Not sure if This is how we want to go about this, but something should happen when lives = 0.
       // Maybe game over?
        playerEntity.removeFromWorld = true;
    }

}


 