const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const AUDIO_MANAGER = new AudioManager(ASSET_MANAGER);

// QUEUE THE GAME MANIFEST
ASSET_MANAGER.queueManifest(GameManifest.data);

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	AUDIO_MANAGER.awaitInitialize(canvas, () => {

		AUDIO_MANAGER.addAudio("Test", "./assets/audio/Victory.wav");
		AUDIO_MANAGER.playOnce("Test");
		console.log("Initialized!");
	}); // test
	
	// Add systems (order matters!)
	gameEngine.addSystem(new PlayerInputSystem());
	gameEngine.addSystem(new GravitySystem());
	gameEngine.addSystem(new StatueSystem());
	gameEngine.addSystem(new MovementSystem());
	gameEngine.addSystem(new CollisionSystem());
	gameEngine.addSystem(new TriggerDetectionSystem()); 
	gameEngine.addSystem(new ToggleColliderSystem());
	gameEngine.addSystem(new ToggleSpriteSystem());
	gameEngine.addSystem(new AnimationSystem());
	gameEngine.addSystem(new RenderSystem());
	gameEngine.addSystem(new EnemySystem());
	gameEngine.addSystem(new DeathSystem());
	gameEngine.addSystem(new EffectSystem());
	gameEngine.addSystem(new LevelChangeSystem());
	gameEngine.addSystem(new LivesSystem());
	gameEngine.addSystem(new YarnSystem());
	gameEngine.addSystem(new TrapSystem());
	gameEngine.addSystem(new WinSystem());

	//these calls set up the prototype level, should be refactored so we can load different levels
	//loadPrototypeLevel();

	// NOTE: In the final game this should only ever start on the main menu.

	loadLevel1();
	
	gameEngine.start();
});
