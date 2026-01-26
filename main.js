const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/rat.png");
ASSET_MANAGER.queueDownload("./sprites/spikes.png");


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


	gameEngine.addEntity(createPlayer(200, 200));
	gameEngine.addEntity(createRat(500, 400));
	gameEngine.addEntity(createSpike(200, 400));
	gameEngine.addEntity(createBox(300, 400));

	gameEngine.start();
});
