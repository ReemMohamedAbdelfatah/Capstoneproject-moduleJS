/**
 * @jest-environment jsdom
 */

import PopUp from '../modules/PopUp.js';

describe('creating DOM nodes', () => {
  test('node is created', () => {
    expect(typeof PopUp.createElements('h1')).toBe('object');
  });

  test('create node and append to parent', () => {
    const div = document.createElement('div');

    const img = PopUp.createElements('img', div);

    expect(div.firstChild).toBe(img);
  });
});