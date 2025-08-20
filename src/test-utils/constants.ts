import { vi } from 'vitest';

export const PIKACHU_NAME = 'pikachu';
export const BULBASAUR_NAME = 'bulbasaur';
export const URL = 'https://pokeapi.co/api/v2/pokemon/';
export const mockFetch = vi.fn();

export const pikachuData = { name: PIKACHU_NAME, height: 4, weight: 60 };
export const bulbasaurData = { name: BULBASAUR_NAME, height: 7, weight: 69 };
