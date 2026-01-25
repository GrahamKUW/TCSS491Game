// Absolutely horrid but you cannot load json from local device so it must be a .js instead

const Scene1 = {
  data: [
    {
      GameObject: {
        Name: "Test Object",
        UniqueIdentifier: "Test Object",
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
  ],
};
