// Effectively the script that runs the main menu. 

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
    gameEngine.addEntity(createMenuButton(352, 385, "start"));
    gameEngine.addEntity(createMenuButton(352, 535, "levels"));
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
    //NOTE: Next line is purposefully commented out for now. Once special levels are made, uncomment.
    // gameEngine.addEntity(createMenuButton(1100, 600, "next2"))
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
    gameEngine.addEntity(createMenuButton(116, 600, "prev2"))
    gameEngine.addEntity(createMenuButton(608, 600, "home"))

    //load level buttons and screenshots
    for (let i = 1; i <= 5; i++) {
        gameEngine.addEntity(createLevelButton(70 + (i-1) * 192 + 30 * i, 220, i + 20));
    }
}

function loadSettingsMenu(){
    gameEngine.entities = []; // clear out all entities
    
    //Load background
    gameEngine.addEntity(createMenuBackground(0, 0));

}


