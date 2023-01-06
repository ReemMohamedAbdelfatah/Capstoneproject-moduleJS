/**
 * @jest-environment jsdom
 */

import counter from "../modules/Reservations/Counter";
import apiMock from './reservationAPIMock.js';

describe('true reservation count', () => {
    test('zero reservations', () => {
      const div = document.createElement('div');
      const count = counter(div);
      expect(count).toBe(0);
    });
  
    test('not zoro reservations', () => {
      const div = document.createElement('div');
      const reservations = [{
            "username": "John",
            "startDate": "2020-12-17",
            "endDate": "2020-12-18"
        },{
            "username": "Jane",
            "startDate": "2021-1-12",
            "endDate": "2021-1-17"
      }];
  
      apiMock(div, reservations);
      const count = counter(div);;
      expect(count).toBe(2);
    });
  });
  
describe('conting of html p', () => {
test('zero elements', () => {
    const div = document.createElement('div');

    apiMock(div, null);
    const count = counter(div);;
    expect(count).toBe(0);
});
});