export type Result = {
  count: number;
  data: DataResult[];
};

export type DataResult = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
};

export type Response = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      name: string;
      url: string;
    },
  ];
};

export type AdditionalResponse = {
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
};
