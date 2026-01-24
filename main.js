const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./robosprite.png");

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");

  gameEngine.init(ctx);

  // TEST CODE - REMOVE WHEN DONE
  const ecsManager = new ECSManager();

  const gameObject = new TestObject(ecsManager);

  TransformSystem.translate(
    gameObject.transform,
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
  );

  const sprite = new SpriteComponent(
    ASSET_MANAGER.getAsset("./robosprite.png"),
    32,
    32,
    false,
    false,
  );

  TransformSystem.scaleCenter(
    gameObject.transform,
    10,
    10,
    sprite.width,
    sprite.height,
    sprite.flip,
  );

  gameObject.setComponent(sprite);

  gameEngine.addEntity(gameObject);
  console.log(gameObject.name);
  // END TEST CODE - REMOVE WHEN DONE

  gameEngine.start();
});
