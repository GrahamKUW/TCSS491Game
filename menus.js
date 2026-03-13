// Effectively the script that runs the main menu. 
this.state = false;

//used to set the character state in the maneki/rakki buttons. 
function setState(bool){
    this.state = bool;
}

// variable to store the audio from audioManager for use with buttons. 0.0 <= audio <= 1.0
this.vol = 0.5;

function setVolume(newVol) {
    this.vol = Math.round(newVol * 10) / 10;
}




// Main menu is hard coded. 
function loadMainMenu(){
    //Draw the main menu background sprite (WIP sprite used instead while i work on main one)

    gameEngine.entities = []; // clear out all entities
    gameEngine.addEntity(createMenuBackground(0, 0));
    gameEngine.addEntity(createTitle(0, 0));

    gameEngine.yarnCollected = 0; // reset yarn collection

    /**  Create the buttons that the user interracts with; should be Settings and Start for sure. 
    * Maybe add a level select one too? 
    * Button code is to be implemented here; keep track of the buttons, and when x button is 
    * clicked, do x effect. 
    */
    gameEngine.addEntity(createMenuButton(448, 385, "start", scalingFactor = 2));
    gameEngine.addEntity(createMenuButton(448, 485, "levels", scalingFactor = 2));
    gameEngine.addEntity(createMenuButton(448, 585, "settings", scalingFactor = 2));

    if(!altCharacter) {
        gameEngine.addEntity(createManekiObject(70, 300, 10));
    }
    else 
        gameEngine.addEntity(createRakkiObject(70, 300, 10));
    gameEngine.addEntity(createStatueObject(900, 300, 10));
    gameEngine.addEntity(createYarnObject(950, 0, 10));
    //Main menu music eventually, probably. 
}

/**
 * This function loads the first level select menu. These are the levels 1-10.
 * 
 * This can probably be done in a for loop, but i dont know how to change where it searches for
 * assets using a counter variable. 
 * 
 * NOTE: any unmade levels will have an empty box in the center. Please let me (Gus) know when
 * other levels are added, so i can get screenshots and the like. 
 */
function loadLevelsMenu1(){
    gameEngine.entities = []; // clear out all entities
    
    //Load background
    gameEngine.addEntity(createMenuBackground(0, 0));

    //load navigation buttons
    gameEngine.addEntity(createMenuButton(1100, 600, "next1"))
    gameEngine.addEntity(createMenuButton(608, 600, "home"))

    //load level buttons and screenshots
    for (let i = 1; i <= 5; i++) {
        gameEngine.addEntity(createLevelButton(70 + (i-1) * 192 + 30 * i, 120, i));
        gameEngine.addEntity(createWindow(100 + (i-1) * 192 + 30 * i, 158, i));
        gameEngine.addEntity(createLevelButton(70 + (i-1) * 192 + 30 * i, 320, i + 5));
        gameEngine.addEntity(createWindow(100 + (i-1) * 192 + 30 * i, 358, i + 5));
    }

}

function loadLevelsMenu2(){
    gameEngine.entities = []; // clear out all entities
    
    //Load background
    gameEngine.addEntity(createMenuBackground(0, 0));

    //load navigation buttons
    if (gameEngine.unlockedSecretLevels){
        //NOTE: uncomment once special levels are done. 
        //gameEngine.addEntity(createMenuButton(1100, 600, "next2")) 
    } else {
        gameEngine.addEntity(createInactiveNextButton(1100, 600, 2));
        //debug; remove later
        gameEngine.addEntity(createMenuButton(1100, 500, "next2"));
    }
    
    gameEngine.addEntity(createMenuButton(116, 600, "prev1"))
    gameEngine.addEntity(createMenuButton(608, 600, "home"))

    for (let j = 1; j <= 5; j++) {
        gameEngine.addEntity(createLevelButton(70 + (j-1) * 192 + 30 * j, 120, j + 10));
        gameEngine.addEntity(createWindow(100 + (j-1) * 192 + 30 * j, 158, j + 10));
        gameEngine.addEntity(createLevelButton(70 + (j-1) * 192 + 30 * j, 320, j + 15));
        gameEngine.addEntity(createWindow(100 + (j-1) * 192 + 30 * j, 358, j + 15));
    }
}

function loadLevelsMenu3(){ 
    gameEngine.entities = []; // clear out all entities
    
    //Load background
    gameEngine.addEntity(createMenuBackground(0, 0));

    //load navigation buttons
    gameEngine.addEntity(createMenuButton(116, 600, "prev2"));
    gameEngine.addEntity(createMenuButton(608, 600, "home"));

    //load level buttons and screenshots
    for (let i = 1; i <= 5; i++) {
        gameEngine.addEntity(createLevelButton(70 + (i-1) * 192 + 30 * i, 220, i + 20));
    }
}

function loadSettingsMenu(){
    gameEngine.entities = []; // clear out all entities

    //update the audio; this is changed with the audio navigation buttons
    AUDIO_MANAGER.adjustVolume(vol);
    
    //Load background
    gameEngine.addEntity(createMenuBackground(0, 0));

    //draw the non-interractible objects
    gameEngine.addEntity(createCharacterObject(100, 100, 2));
    gameEngine.addEntity(createSoundObject(100, 300, 2));
    gameEngine.addEntity(createAudioObject(672, 112, 3, this));

    //draw the character select buttons. 
    //For future reference, these are in menubuttonfactory at the bottom. 
    gameEngine.addEntity(createManekiButton(540, 300, 2, this));
    gameEngine.addEntity(createManekiObject(620, 390, 5))
    gameEngine.addEntity(createRakkiButton(900, 300, 2, this));
    gameEngine.addEntity(createRakkiObject(980, 390, 5))

    //draw the audio navigation buttons
    gameEngine.addEntity(createLowVolumeButton(540, 112, 3, this));
    gameEngine.addEntity(createHighVolumeButton(1148, 112, 3, this));


    //finally, draw the home button
    gameEngine.addEntity(createMenuButton(608, 600, "home"));

}




