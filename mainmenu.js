// Effectively the script that runs the main menu. 

// Main menu is hard coded. 
function loadMainMenu(){
    //Draw the main menu background sprite (WIP sprite used instead while i work on main one)

    gameEngine.entities = []; // clear out all entities
    gameEngine.addEntity(createMenu(0, 0));
   
    


    /**  Create the buttons that the user interracts with; should be Settings and Start for sure. 
    * Maybe add a level select one too? 
    * Button code is to be implemented here; keep track of the buttons, and when x button is 
    * clicked, do x effect. 
    */
    gameEngine.addEntity(createMenuButton(352, 385, "start"));
    gameEngine.addEntity(createMenuButton(352, 535, "settings"));
    //Main menu music eventually, probably. 
}


