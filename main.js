const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const AUDIO_MANAGER = new AudioManager(ASSET_MANAGER);

let altCharacter = false; //for main menu character selection

// QUEUE THE GAME MANIFEST
ASSET_MANAGER.queueManifest(GameManifest.data);

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	AUDIO_MANAGER.awaitInitialize(canvas, () => {

		//AUDIO_MANAGER.addAudio("Test", "./assets/audio/Victory.wav");
		addAllMusic(AUDIO_MANAGER);
		AUDIO_MANAGER.playLooped("Main_Music");
		console.log("Audio Manager Initialized!");
	});
	
	// Add systems (order matters!)
	gameEngine.addSystem(new PlayerInputSystem());
	gameEngine.addSystem(new GravitySystem());
	gameEngine.addSystem(new StatueSystem());
	gameEngine.addSystem(new MovementSystem());
	gameEngine.addSystem(new CollisionSystem());
	gameEngine.addSystem(new TriggerDetectionSystem()); 
	gameEngine.addSystem(new ToggleColliderSystem());
	gameEngine.addSystem(new ButtonSpriteSystem());
	gameEngine.addSystem(new ToggleAnimationSystem());
	gameEngine.addSystem(new AnimationSystem());
	gameEngine.addSystem(new RenderSystem());
	gameEngine.addSystem(new EnemySystem());
	gameEngine.addSystem(new DeathSystem());
	gameEngine.addSystem(new EffectSystem());
	gameEngine.addSystem(new LevelChangeSystem());
	gameEngine.addSystem(new UISystem());
	gameEngine.addSystem(new YarnSystem());
	gameEngine.addSystem(new TrapSystem());
	gameEngine.addSystem(new WinSystem());

	//loadMainMenu();
	loadLevel("level_19", true);
	
	gameEngine.start();
});
