

function createMenuButton (x, y, text, scalingFactor = 3, level = 1) {
    //Ugly system to just make the right buttons; effects tied to the button type. 
    if (text == "start") {
        //Start the game; main menu button
        return this.createStartButton(x, y, scalingFactor);
    } 
    /** The following button is currently unimplemented, and has been commented out.
    * else if (text == "restart") {
    *    //Restart the current level; pause menu button
    *    return this.createRestartButton(x, y);
    * } 
    */
    else if (text == "levels") {
        return this.createLevelsButton(x, y, scalingFactor);
    }
    else if (text == "settings") {
        //Open settings menu; pause menu and regular menu
        return this.createSettingsButton(x, y, scalingFactor);
    } else if (text == "next1") {
        return this.createNextButton(x, y, 1);
    } else if (text == "prev1") {
        return this.createPrevButton(x, y, 1);
    } else if (text == "next2") {
        return this.createNextButton(x, y, 2);
    } else if (text == "prev2") {
        return this.createPrevButton(x, y, 2);
    } else if (text == "home") {
        return this.createHomeButton(x, y);
    } else if (text == "level") {
        return this.createLevelButton(x, y, level);
    }

    else {
        // default to credits i guess; Show credits; main menu button
        return this.createCreditsbutton(x, y); 
    }
}

    function createStartButton(x, y, scalingFactor){
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

    function createLevelsButton(x, y, scalingFactor) {
        const entity = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/MenuButton.png"),
                0, 96, 192, 48, scalingFactor, scalingFactor
            ),
            position: new Position(x,y),
            width: 192 * scalingFactor,
            height: 48 * scalingFactor,
            clickable: new Clickable(true), 
            onClick: function() {
                //Debug command // placeholder for when settings was unused. 
                //console.log("Settings currently under construction");
                loadLevelsMenu1();
            }
        }
        return entity;
    }

    function createSettingsButton(x, y, scalingFactor){ 
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
                //Debug command // placeholder for when settings was unused. 
                //console.log("Settings currently under construction");
                loadSettingsMenu();
            }
        }
        return entity;
    }

    function createNextButton (x, y, initPage){
        if (initPage == 1) {
            const entity = {
                sprite: new Sprite(
                    ASSET_MANAGER.getAsset("./assets/sprites/navbutton.png"),
                    0, 0, 32, 32, 2, 2
                ),
                position: new Position(x,y),
                width: 32 * 2,
                height: 32 * 2,
                clickable: new Clickable(true), 
                onClick: function() {
                    loadLevelsMenu2();
                }
            }
            return entity;
        } else {
            const entity = {
                sprite: new Sprite(
                    ASSET_MANAGER.getAsset("./assets/sprites/navbutton.png"),
                    0, 0, 32, 32, 2, 2
                ),
                position: new Position(x,y),
                width: 32 * 2,
                height: 32 * 2,
                clickable: new Clickable(true), 
                onClick: function() {
                    loadLevelsMenu3();
                }
            }
            return entity;
        }
        
    }


    function createPrevButton (x, y, destPage){
        if (destPage == 1) {
            const entity = {
                sprite: new Sprite(
                    ASSET_MANAGER.getAsset("./assets/sprites/navbutton.png"),
                    0, 32, 32, 32, 2, 2
                ),
                position: new Position(x,y),
                width: 32 * 2,
                height: 32 * 2,
                clickable: new Clickable(true), 
                onClick: function() {
                    loadLevelsMenu1();
                }
            }
            return entity;
        } else {
            const entity = {
                sprite: new Sprite(
                    ASSET_MANAGER.getAsset("./assets/sprites/navbutton.png"),
                    0, 32, 32, 32, 2, 2
                ),
                position: new Position(x,y),
                width: 32 * 2,
                height: 32 * 2,
                clickable: new Clickable(true), 
                onClick: function() {
                    loadLevelsMenu2();
                }
            }
            return entity;
        }
    }


    function createHomeButton(x, y) {
        const entity = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/navbutton.png"),
                0, 64, 32, 32, 2, 2
            ),
            position: new Position(x,y),
            width: 32 * 2,
            height: 32 * 2,
            clickable: new Clickable(true), 
            onClick: function() {
                loadMainMenu();
                CURRENT_LEVEL = "prototype_level";
            }
        }
        return entity;
    }

    function createLevelButton(x, y, level) {
        clickfun = loadLevel1;
        switch (level){
                case 1: 
                    clickfun = function() {
                        loadLevel1();
                    }
                    break;
                case 2: 
                    clickfun = function() {
                        loadLevel2();
                    }
                    break;
                case 3: 
                    clickfun = function() {
                        loadLevel3();
                    }
                    break;
                case 4: 
                    clickfun = function() {
                        loadLevel4();
                    }
                    break;
                case 5: 
                    clickfun = function() {
                        loadLevel5();
                    }
                    break;
                case 6: 
                    clickfun = function() {
                        loadLevel6();
                    }
                    break;
                case 7: 
                    clickfun = function() {
                        loadLevel7();
                    }
                    break;
                case 8: 
                    clickfun = function() {
                        loadLevel8();
                    }
                    break;
                case 9: 
                    clickfun = function() {
                        loadLevel9();
                    }
                    break;
                case 10: 
                    clickfun = function() {
                        loadLevel10();
                    }
                    break;
                case 11: 
                    clickfun = function() {
                        loadLevel11();
                    }
                    break;
                case 12: 
                    clickfun = function() {
                        loadLevel12();
                    }
                    break;
                case 13: 
                    clickfun = function() {
                        loadLevel13();
                    }
                    break;
                case 14: 
                    clickfun = function() {
                        //loadLevel14();
                        console.log("Level under construction");
                    }
                    break;
                case 15: 
                    clickfun = function() {
                        //loadLevel15();
                        console.log("Level under construction");
                    }
                    break;
                case 16: 
                    clickfun = function() {
                        //loadLevel16();
                        console.log("Level under construction");
                    }
                    break;
                case 17: 
                    clickfun = function() {
                        //loadLevel17();
                        console.log("Level under construction");
                    }
                    break;
                case 18: 
                    clickfun = function() {
                        //loadLevel18();
                        console.log("Level under construction");
                    }
                    break;
                case 19: 
                    clickfun = function() {
                        //loadLevel19();
                        console.log("Level under construction");
                    }
                    break;
                case 20: 
                    clickfun = function() {
                        loadLevel20();
                    }
                    break;
                default: 
                    clickfun = function() {
                        loadLevel1();
                    }
                
            }

        const entity = {
            sprite: new Sprite(
                ASSET_MANAGER.getAsset("./assets/sprites/LevelSelectButton.png"),
                0, 144 * (level-1), 192, 144, 1, 1
            ),
            position: new Position(x,y),
            width: 192,
            height: 144,
            clickable: new Clickable(true), 
            onClick: clickfun
        }
        return entity;
    }
    
