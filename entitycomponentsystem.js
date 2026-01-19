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
const RENDERABLE_COMPONENT_INDEX = 1; // Renderable Component
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
   * @param {Entity} entity Entity to get the component for.
   * @param {Integer} componentType Type of component to get.
   */
  getComponent(entity, componentType) {
    const result = this.table[componentType][entity.identifier];

    if (entity.identifier >= this.table[0].length || entity < 0) {
      console.error("No such entity: " + entity);
    }

    if (componentType >= this.table.length || componentType < 0) {
      console.error("No such component with ID: " + componentType);
    }

    if (result === null || result === undefined) {
      console.error("Could not find component on entity: " + entity);
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
    return this.ecsManager.getComponent(this.entity, componentType);
  }

  /**
   * Sets the entities component with a type to a new component. They should be the same type.
   * @param {Integer} componentType One of the predfined component types.
   * @param {Component} newComponent New component of the same type
   */
  setComponent(componentType, newComponent) {
    this.ecsManager.setComponent(this.entity, componentType, newComponent);
  }
}
