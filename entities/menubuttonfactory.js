function createMenuButton (x, y, text, scalingFactor = 3) {
    

    //Ugly system to just make the right buttons; effects tied to the button type. 
    if (text == "start") {
        //Start the game; main menu button
        return this.createStartButton(x, y);
    } 
    /** The following button is currently unimplemented, and has been commented out.
    * else if (text == "restart") {
    *    //Restart the current level; pause menu button
    *    return this.createRestartButton(x, y);
    * } 
    */
    else if (text == "settings") {
        //Open settings menu; pause menu and regular menu
        return this.createSettingsButton(x, y);
    } else {
        // default to credits i guess; Show credits; main menu button
        return this.createCreditsbutton(x, y); 
    }
}

    function createStartButton(x, y, scalingFactor = 3){
        const entity = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/MenuButton.png"),
                0, 0, 192, 48, 3, 3
            ),
            width: 192 * scalingFactor,
            height: 48 * scalingFactor,
            position: new Position(x,y),
            clickable: new Clickable(true),
            onClick: function() {
                loadLevel1();
            }
        }
        return entity;

    }

    function createSettingsButton(x, y, scalingFactor = 3) {
        const entity = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/MenuButton.png"),
                0, 48, 192, 48, scalingFactor, scalingFactor
            ),
            position: new Position(x,y),
            width: 192 * scalingFactor,
            height: 48 * scalingFactor,
            clickable: new Clickable(true), 
            onClick: function() {
                console.log("Settings currently under construction");
            }
        }
        return entity;
    }