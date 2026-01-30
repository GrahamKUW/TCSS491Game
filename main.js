const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// QUEUE THE GAME MANIFEST
ASSET_MANAGER.queueManifest(GameManifest.data);




ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	// Add systems (order matters!)
	gameEngine.addSystem(new PlayerInputSystem());
	gameEngine.addSystem(new GravitySystem());
	gameEngine.addSystem(new StatueSystem());
	gameEngine.addSystem(new MovementSystem());
	gameEngine.addSystem(new CollisionSystem());
	gameEngine.addSystem(new AnimationSystem());
	gameEngine.addSystem(new RenderSystem());


	//these calls set up the prototype level, should be refactored so we can load different levels
	gameEngine.addEntity(createBackground("./assets/sprites/prototype_background.png"));
	gameEngine.addEntity(createPlayer(30, 656, 30, 600));
	gameEngine.addEntity(createRat(600, 656));
	gameEngine.addEntity(createSpike(256, 656));
	gameEngine.addEntity(createWall(0,704,1024,64));
	gameEngine.addEntity(createWall(190,640,64,64));
	gameEngine.addEntity(createWall(470,550,64, 154));
	gameEngine.addEntity(createWall(780,640,64, 64));

	gameEngine.start();
});
