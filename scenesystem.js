/*
    Created by KG
    Consists of a scenemanager and scene class with special classes for particular levels.
    All data will be for each level will be contained within a scene and each scene has its own ECSManager to deal with objects.
*/

class SceneManager {
  constructor() {
    this.currentScene = null;
    this.scenes = null;
  }

  draw(ctx) {
    if (this.currentScene === null) {
      return;
    }

    this.currentScene.draw(ctx);
  }

  update() {
    if (this.currentScene === null) {
      return;
    }

    this.currentScene.update();
  }

  initialize(initialScene) {
    if (initialScene === null || initialScene === undefined) {
      throw new Error("Cannot add null or undefined scene!");
    }

    this.currentScene = initialScene;
    // enter scene
    this.scenes = [this.currentScene];
  }

  addScene(newScene) {
    if (this.scenes === null) {
      throw new Error("Scene system not initialized!");
    }

    if (newScene === null || newScene === undefined) {
      throw new Error("Cannot add null or undefined scene!");
    }

    this.scenes.push(newScene);
  }

  switchScene(sceneIndex) {
    if (this.scenes === null) {
      throw new Error("Scene system not initialized!");
    }

    if (sceneIndex < 0 || sceneIndex >= this.scenes.length) {
      throw new Error("Prospective scene index is out of bounds!");
    }
    // exit current scene
    this.currentScene = this.scenes[sceneIndex];
    // enter new scene
  }
}

class Scene {
  constructor(sceneManager, sceneData) {
    // initialize scene data
    this.sceneManager = sceneManager;
    this.ecsManager = new ECSManager();
    this.heirarchy = [];

    for (let i = 0; i < sceneData.length; i++) {
      const gameObject = new GameObject(this.ecsManager);
      setupGameObject(gameObject, sceneData[i].GameObject.Components);

      if (this.heirarchy[0] === null) {
        this.heirarchy[0] = gameObject;
      } else {
        this.heirarchy.push(gameObject);
      }
    }

    // add entities to the scenemanager based on scene data JSON
  }

  draw(ctx) {
    // get all Sprites in the ecs manager to draw.

    for (let i = 0; i < this.ecsManager.entities.length; i++) {
      const spriteComponent = this.ecsManager.getComponent(
        i,
        SPRITE_COMPONENT_INDEX,
      );

      if (spriteComponent === null) {
        continue;
      }

      const transformComponent = this.ecsManager.getComponent(
        i,
        TRANSFORM_COMPONENT_INDEX,
      );

      SpriteSystem.draw(ctx, spriteComponent, transformComponent);
    }
  }

  update() {
    // call update on all Game Objects in heirarchy

    for (let i = 0; i < this.heirarchy.length; i++) {
      this.heirarchy[i].update();
    }
  }
}

function setupGameObject(gameObject, componentsList) {
  // Could get really big investigate better system, rather than for each component, or just organize it better
  gameObject.name;

  // DEFINES A Transform COMPONENT
  if (componentsList.Transform !== undefined) {
    gameObject.setComponent(
      new TransformComponent(
        orDefault(componentsList.Transform.PositionX, 0),
        orDefault(componentsList.Transform.PositionY, 0),
        orDefault(componentsList.Transform.Rotation, 0),
        orDefault(componentsList.Transform.ScaleX, 1),
        orDefault(componentsList.Transform.ScaleY, 1),
      ),
    );
  }

  // DEFINES A SPRITE COMPONENT
  if (componentsList.Sprite !== undefined) {
    const spritesheet = ASSET_MANAGER.getAsset(
      componentsList.Sprite.SpritesheetPath,
    );

    if (spritesheet === null || spritesheet === undefined) {
      throw new Error("Spritesheet cannot be null or undefined!");
    }

    gameObject.setComponent(
      new SpriteComponent(
        spritesheet,
        orDefault(componentsList.Sprite.CellSizeX, spritesheet.width),
        orDefault(componentsList.Sprite.CellSizeY, spritesheet.height),
        orDefault(componentsList.Sprite.Filter, false),
        orDefault(componentsList.Sprite.IsFlipped, false),
      ),
    );
  }
}

/**
 * checks if the value is null or undefined and sets it with respect to a default value
 * @param {ANY} value
 * @param {ANY} defaultValue
 * @returns
 */
function orDefault(value, defaultValue) {
  const isValid = value !== null && value !== undefined;
  return isValid ? value : defaultValue;
}
