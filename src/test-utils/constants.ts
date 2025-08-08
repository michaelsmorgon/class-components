import type { DataResult, Result } from '../utils/types';

export const pikachuData: DataResult = {
  name: 'pikachu',
  height: 4,
  weight: 99,
  sprites: {
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      },
    },
  },
};
export const bulbasaurData = {
  count: 1,
  data: {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        },
      },
    },
  },
};
export const mockData: Result = {
  count: 3,
  data: [
    {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
          },
        },
      },
    },
    {
      name: 'charmander',
      height: 6,
      weight: 85,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
          },
        },
      },
    },
    {
      name: 'pikachu',
      height: 4,
      weight: 99,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
          },
        },
      },
    },
  ],
};
