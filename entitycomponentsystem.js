/*  Entity Component System
    Created by KG
    
    Entities:    ID's to identify objects asscoiated with components
    Components:  Data storage objects, that contain fields and nothing else.
    Systems:     Black boxes that take in data and output a result they have no state.

    The ECS system here works on a 2d grid with a finite number of components.
    
    Accessing the table is in constant time but it takes # of component types amount of time to add a new entity.

    Each entity can have only one component of a type for now.

    Remove entity function to be created as needed.
*/

const COMPONENT_AMOUNT = 3; // 3 for now add more when coming up with new components
const TRANSFORM_COMPONENT_INDEX = 0; // Transform Component
const SPRITE_COMPONENT_INDEX = 1; // Renderable Component
const ANIMATOR_COMPONENT_INDEX = 2; // Animator Component

/**
 * A base class for an ECS Entity
 *
 */
class Entity {
  /**
   * Creates an ECS Entity
   *
   */
  constructor() {
    this.identifier = -1;
  }
}

/**
 * A base class for an ECS Component
 *
 */
class Component {
  /**
   * Creates an ECS Component with a type defined by an integer.
   * @param {Integer} type
   */
  constructor(type) {
    if (type >= COMPONENT_AMOUNT || type < 0) {
      console.error("impossible component type: " + type);
    }
    this.type = type;
  }
}

/**
 * Manages and handles the Current Entity Component System including storing data and handling
 */
class ECSManager {
  constructor() {
    // 2d array columns are entities rows are components, entities can be as big as they want
    // components must be a fixed size based on all components in the game
    this.table = [[]];
    this.entities = [];
    this.entityCount = 0;
  }

  /**
   * Sets a component in the heirarchy table to a different component
   * @param {Integer} entityID Entity reference to get the component for.
   * @param {Integer} componentType Type of component to get.
   */
  getComponent(entityID, componentType) {
    const result = this.table[componentType][entityID];

    if (entityID.identifier >= this.table[0].length || entityID < 0) {
      console.error("No such entity: " + entityID);
    }

    if (componentType >= this.table.length || componentType < 0) {
      console.error("No such component with ID: " + componentType);
    }

    if (result === null || result === undefined) {
      console.error("Could not find component on entity: " + entityID);
    }

    return result;
  }

  /**
   * Gets array of components of the specified type in the ECS Manager.
   * @param {Integer} componentType One of the predfined component types.
   * @returns Array of components of the type provided
   */
  getAllComponentsOfType(componentType) {
    if (componentType >= this.table.length || componentType < 0) {
      console.error("No such component with ID: " + componentType);
    }
    return this.table[componentType];
  }

  /**
   * Sets a component in the heirarchy table to a different component
   * @param {Entity} entity Entity that set component type of.
   * @param {Integer} componentType One of the predfined component types.
   * @param {Component} newComponent New component to set.
   */
  setComponent(entity, componentType, newComponent) {
    if (newComponent === null || newComponent === undefined) {
      console.error("new component null or undefined!");
    }

    if (entity.identifier >= this.table[0].length || entity < 0) {
      console.error("No such entity: " + entity);
    }

    if (componentType >= this.table.length || componentType < 0) {
      console.error("No such component with ID: " + componentType);
    }

    this.table[componentType][entity.identifier] = newComponent;
  }

  /**
   * Adds a new entity to this ecs heirarchy table
   * @param {Component} components List of components to add with the entity
   * @param {Entity} entity Entity to add.
   */
  addEntity(
    entity = new Entity(),
    components = new Array(COMPONENT_AMOUNT).fill(null),
  ) {
    if (components.length !== COMPONENT_AMOUNT) {
      console.error(
        "Components array must be " +
          COMPONENT_AMOUNT +
          " elements in length! It was: " +
          components.length,
      );
    }
    // new column -> foreach value in components set it to the components value.
    if (this.table[0].length === 0) {
      components.forEach((value, rowIndex) => {
        if (!this.table[rowIndex]) this.table[rowIndex] = []; // add row if missing
        this.table[rowIndex][0] = value; // set first column
      });
      entity.identifier = 0;
      this.entities[0] = entity;
      this.entityCount = 1;
    } else {
      components.forEach((value, rowIndex) => {
        if (!this.table[rowIndex]) this.table[rowIndex] = []; // add row if missing
        this.table[rowIndex].push(value);
      });
      entity.identifier = this.entityCount;
      this.entityCount += 1;
      this.entities.push(entity);
    }
  }
}

/**
 * Base ECS Object, not meant to be used directly in the game just used via inheritence.
 */
class ECSObject {
  /**
   * Creates a new base ECS Object
   * @param {ECSManager} ecsManager
   * @param {Entity} entity
   * @param {Component} components
   * @param {String} name;
   * @param {String} uniqueIdentifier
   */
  constructor(
    ecsManager,
    entity = new Entity(),
    components = new Array(COMPONENT_AMOUNT).fill(null),
    name = "ECSObject",
    uniqueIdentifier = "Undefined ID",
  ) {
    this.entity = entity;
    this.components = components;
    ecsManager.addEntity(entity, components);
    this.ecsManager = ecsManager;
    this.name = name;
    this.uniqueIdentifier = uniqueIdentifier;
  }

  /**
   * Gets a component type
   * @param {Integer} componentType One of the predfined component types.
   * @returns New component of the same type
   */
  getComponent(componentType) {
    return this.ecsManager.getComponent(this.entity.identifier, componentType);
  }

  /**
   * Sets the entities component with a type to a new component. They should be the same type.
   * @param {Component} newComponent New component of the same type
   */
  setComponent(newComponent) {
    this.ecsManager.setComponent(this.entity, newComponent.type, newComponent);
  }
}

class GameObject extends ECSObject {
  constructor(
    ecsManager,
    name = "Unnamed GameObject",
    uniqueIdentifier = "Undefined ID",
  ) {
    super(ecsManager);
    this.uniqueIdentifier = uniqueIdentifier;
    this.setComponent(new TransformComponent()); // all game objects will have a transform
    this.transform = this.getComponent(TRANSFORM_COMPONENT_INDEX);
  }

  draw(ctx) {
    // do something, no longer needed, but we'll keep it temporarily
  }

  update() {
    // do something, not tied to the game engine anymore
  }
}

// ------------------------------------------------------------------------------------------------------------------------
// GAME ECS COMPONENTS
// ------------------------------------------------------------------------------------------------------------------------

class TransformComponent extends Component {
  constructor(posX = 0, posY = 0, rotZ = 0, sclX = 1, sclY = 1) {
    super(TRANSFORM_COMPONENT_INDEX);
    this.position = { x: posX, y: posY };
    this.rotation = rotZ;
    this.scale = { x: sclX, y: sclY };
  }
}

class SpriteComponent extends Component {
  constructor(
    spritesheet,
    cellSizeX = spritesheet.width,
    cellSizeY = spritesheet.height,
    filter = false,
    isFlipped = false,
  ) {
    super(SPRITE_COMPONENT_INDEX);
    this.spritesheet = spritesheet;
    this.cellSizeX = cellSizeX;
    this.cellSizeY = cellSizeY;
    this.cellPosX = 0;
    this.cellPosY = 0;
    this.filter = filter;
    this.flip = isFlipped;

    this.cellAmountX = this.spritesheet.width / this.cellSizeX; // treat as grid, use for bounds checking
    this.cellAmountY = this.spritesheet.height / this.cellSizeY; // treat as grid
    this.isHidden = false;
    this.width = cellSizeX;
    this.height = cellSizeY;

    console.log(
      "Sprite Component created with cells ( " +
        this.cellAmountX +
        " , " +
        this.cellAmountY +
        " )",
    );
  }
}

// ------------------------------------------------------------------------------------------------------------------------
// GAME ECS SYSTEMS
// ------------------------------------------------------------------------------------------------------------------------
class SpriteSystem {
  static draw(ctx, spriteComponent, transformComponent) {
    if (spriteComponent.isHidden) {
      // if hidden don't draw
      return;
    }

    spriteComponent.width =
      spriteComponent.cellSizeX * transformComponent.scale.x;
    spriteComponent.height =
      spriteComponent.cellSizeY * transformComponent.scale.y;

    const cellImgX = spriteComponent.cellPosX * spriteComponent.cellSizeX;
    const cellImgY = spriteComponent.cellPosY * spriteComponent.cellSizeY;
    const flippedStatus = spriteComponent.flip ? -1 : 1; // assume facing right from start

    ctx.save();
    ctx.imageSmoothingEnabled = spriteComponent.filter;

    // needs to incorporate rotations.

    ctx.scale(flippedStatus, 1);

    ctx.drawImage(
      spriteComponent.spritesheet,
      cellImgX,
      cellImgY,
      spriteComponent.cellSizeX,
      spriteComponent.cellSizeY,
      flippedStatus * transformComponent.position.x,
      transformComponent.position.y,
      spriteComponent.width,
      spriteComponent.height,
    );

    ctx.restore();
  }
}

class TransformSystem {
  static translate(transformComponent, x, y) {
    transformComponent.position.x = x;
    transformComponent.position.y = y;
  }

  static rotate(transformComponent, rotation) {
    transformComponent.rotation = rotation;
  }

  static scale(transformComponent, x, y) {
    transformComponent.scale.x = x;
    transformComponent.scale.y = y;
  }

  static center(transformComponent, width, height, isFlipped = false) {
    const widthMod = (isFlipped ? 1 : 0) * transformComponent.scale.x * width;

    transformComponent.position.x -=
      (width * transformComponent.scale.x) / 2 - widthMod;

    transformComponent.position.y -= (height * transformComponent.scale.y) / 2;
  }

  static scaleCenter(
    transformComponent,
    x,
    y,
    width,
    height,
    isFlipped = false,
  ) {
    this.scale(transformComponent, x, y);
    this.center(transformComponent, width, height, isFlipped);
  }

  static translateCenter(
    transformComponent,
    x,
    y,
    width,
    height,
    isFlipped = false,
  ) {
    this.translate(transformComponent, x, y);
    this.center(transformComponent, width, height, isFlipped);
  }
}
