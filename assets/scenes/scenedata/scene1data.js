// Absolutely horrid but you cannot load json from local device so it must be a .js instead

const Scene1 = {
  data: [
    {
      GameObject: {
        Name: "Test Object",
        UniqueIdentifier: "Test Object 1",
        Components: {
          Transform: {
            PositionX: 0,
            PositionY: 0,
            Rotation: 0,
            ScaleX: 10,
            ScaleY: 10,
          },
          Sprite: {
            SpritesheetPath: "./robosprite.png",
            CellSizeX: 32,
            CellSizeY: 32,
            Filter: false,
            IsFlipped: false,
          },
        },
      },
    },
    {
      GameObject: {
        Name: "Test Object",
        UniqueIdentifier: "Test Object 2",
        Components: {
          Transform: {
            PositionX: 400,
            ScaleX: 10,
            ScaleY: 10,
          },
          Sprite: {
            SpritesheetPath: "./robosprite.png",
            CellSizeX: 32,
            CellSizeY: 32,
          },
        },
      },
    },
    {
      GameObject: {
        Name: "Test Object",
        UniqueIdentifier: "Test Object 3",
        Components: {
          Transform: {
            PositionY: 400,
            ScaleX: 10,
            ScaleY: 10,
          },
          Sprite: {
            SpritesheetPath: "./robosprite.png",
            CellSizeX: 32,
            CellSizeY: 32,
          },
        },
      },
    },
    {
      GameObject: {
        Name: "Test Object",
        UniqueIdentifier: "Test Object 4",
        Components: {
          Transform: {
            PositionX: 400,
            PositionY: 400,
            ScaleX: 10,
            ScaleY: 10,
          },
          Sprite: {
            SpritesheetPath: "./robosprite.png",
            CellSizeX: 32,
            CellSizeY: 32,
          },
        },
      },
    },
  ],
};
