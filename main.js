const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Just putting it here until we have a proper game data file or something
const TILEMAP_POSITION_X = -400;
const TILEMAP_POSITION_Y = -168;
const TILEMAP_SCALE_X = 2;
const TILEMAP_SCALE_Y = 2;
const LEVEL_REFERENCE = "prototype_level";

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
	gameEngine.addSystem(new TriggerDetectionSystem()); 
	gameEngine.addSystem(new ToggleColliderSystem());
	gameEngine.addSystem(new ToggleSpriteSystem());
	gameEngine.addSystem(new AnimationSystem());
	gameEngine.addSystem(new RenderSystem());
	gameEngine.addSystem(new EnemySystem());
	gameEngine.addSystem(new DeathSystem());
	gameEngine.addSystem(new EffectSystem());

	//these calls set up the prototype level, should be refactored so we can load different levels
	
	// Create level elements	
	constructTilemap(gameEngine, LEVEL_REFERENCE,"./assets/sprites/StatueCatsTileset.png" , TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y)
	// Create level collider
	constructColliders(gameEngine, LEVEL_REFERENCE, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);

	constructHazards(gameEngine, LEVEL_REFERENCE, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
	//console.log(getTileMapObjects(LEVEL_REFERENCE, GAMEOBJECT_LAYER));
	constructGameObjects(gameEngine, LEVEL_REFERENCE, TILEMAP_POSITION_X, TILEMAP_POSITION_Y, TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
	
	gameEngine.start();
});
