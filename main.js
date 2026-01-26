const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	// Add systems (order matters!)
	gameEngine.addSystem(new PlayerInputSystem());
	gameEngine.addSystem(new GravitySystem());
	gameEngine.addSystem(new StatueSystem());
	//collision likely goes in between player Input and movement once added
	gameEngine.addSystem(new MovementSystem());
	gameEngine.addSystem(new RenderSystem()); 


	gameEngine.addEntity(createPlayer(this, 200, 200));

	gameEngine.start();
});
