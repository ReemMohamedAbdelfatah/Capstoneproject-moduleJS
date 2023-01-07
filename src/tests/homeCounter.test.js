/**
 * @jest-environment jsdom
 */

import counter from '../modules/counter.js';
import displayPokemon from '../../__mocks__/likeAPiMock.js';

describe('do we get numbers', () => {
  test('zero cards', () => {
    const pokeList = document.createElement('ol');
    const count = counter(pokeList);
    expect(count).toBe(0);
  });

  test('alot of cards', () => {
    const pokeList = document.createElement('ol');
    const data = [{
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }, {
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }, {
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }];
    displayPokemon(data, pokeList);
    expect(counter(pokeList)).toBe(3);
  });
});

describe('we count html nodes', () => {
  test('data loaded to wrong node', () => {
    const pokeList = document.createElement('ol');

    const data = [{
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }, {
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }, {
      name: 'pika',
      id: '1',
      types: [{ type: 'fire' }],
      sprites: { front_default: '' },
    }];
    displayPokemon(data, document.createElement('ol'));

    const count = counter(pokeList);
    expect(count).toBe(0);
  });
});