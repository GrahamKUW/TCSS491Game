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
	gameEngine.addSystem(new GhostBlockSystem());
	gameEngine.addSystem(new AnimationSystem());
	gameEngine.addSystem(new RenderSystem());
	gameEngine.addSystem(new EnemySystem());
	gameEngine.addSystem(new DeathSystem());
	gameEngine.addSystem(new EffectSystem());

	//these calls set up the prototype level, should be refactored so we can load different levels
	
	// Set up the tilemap background
	const background = createTilemapBackground("./assets/sprites/StatueCatsTileset.png",TILEMAP_POSITION_X,TILEMAP_POSITION_Y,  TILEMAP_SCALE_X, TILEMAP_SCALE_Y);
	const palette = mapSpriteToTilePalette(background.sprite);
	const tilemap = getTileMap(LEVEL_REFERENCE); 
	background.sprite.tilemapData = {tilemap: tilemap, palette: palette};
	gameEngine.addEntity(background);

	gameEngine.addEntity(createRat(720, 556, 50));
	gameEngine.addEntity(createSpike(560, 510));
	gameEngine.addEntity(createSpike(560-64, 510));
	gameEngine.addEntity(createSpike(560-64*2, 510));

	gameEngine.addEntity(createPlatform(688, 375));
	gameEngine.addEntity(createCrate(976-32, 375));
	gameEngine.addEntity(createCrate(976, 375));
	gameEngine.addEntity(createCrate(976, 375-32));

	gameEngine.addEntity(createButton(655.5, 440, 1));
	gameEngine.addEntity(createGate(880, 343, 1))


	//Example trigger 
	//gameEngine.addEntity(createGhostTrigger(300, 400, 16, 16, 0, 0, "ghostblock1"));
	//gameEngine.addEntity(createGhostBlock(500, 400, 64, 64, 0, 0, "ghostblock1"));	
	//gameEngine.addEntity(createGhostBlock(400, 400, 64, 64, 0, 0, "ghostblock1"));	

	gameEngine.addEntity(createPlayer(275, 425, 275, 425));

	// Create level collider
	const colliderData = getTileMapColliders(LEVEL_REFERENCE);

	for (let i = 0; i < colliderData.length; i++) {
		const collider = colliderData[i]

		const wallX = TILEMAP_POSITION_X + collider.x * TILEMAP_SCALE_X;
		const wallY = TILEMAP_POSITION_Y + collider.y * TILEMAP_SCALE_Y;
		const wallWidth = collider.width * TILEMAP_SCALE_X;
		const wallHeight = collider.height * TILEMAP_SCALE_Y;

		gameEngine.addEntity(createWall(wallX,wallY,wallWidth, wallHeight ));
    
  	}
	/*
	gameEngine.addEntity(createWall(0,704,1024,64));
	gameEngine.addEntity(createWall(190,640,64,64));
	gameEngine.addEntity(createWall(470,550,64, 154));
	gameEngine.addEntity(createWall(780,640,64, 64));
	*/
	

	gameEngine.start();
});
