const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// QUEUE THE GAME MANIFEST
ASSET_MANAGER.queueManifest(GameManifest.data);

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");

  gameEngine.init(ctx);

  // TEST CODE - REMOVE WHEN DONE
  const sceneManager = new SceneManager();
  const scene1 = new Scene(sceneManager, Scene1.data);
  sceneManager.initialize(scene1);
  gameEngine.addEntity(sceneManager);
  // END TEST CODE
  gameEngine.start();
  return;
});
