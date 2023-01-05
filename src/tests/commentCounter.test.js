/**
 * @jest-environment jsdom
 */

import appendCommentsMock from '../../__mocks__/apiMock.js';
import PopUp from '../modules/PopUp.js';

describe('count is a number', () => {
  test('no comments', () => {
    const div = document.createElement('div');
    const count = PopUp.countComments(div);
    expect(count).toBe(0);
  });

  test('some comments', () => {
    const div = document.createElement('div');
    const comments = [{
      comment: 'This is nice!',
      creation_date: '2021-01-10',
      username: 'John',
    }, {
      comment: 'Great content!',
      creation_date: '2021-02-10',
      username: 'Jane',
    }];

    appendCommentsMock(div, comments);
    const count = PopUp.countComments(div);
    expect(count).toBe(2);
  });
});

describe('conting elements', () => {
  test('nothing is rendered but API returned data', () => {
    const div = document.createElement('div');

    appendCommentsMock(div, null);
    const count = PopUp.countComments(div);
    expect(count).toBe(0);
  });
});