import * as actions from '../actions';

describe('actions', () => {
  test('toggleAuthenticated', () => {
    expect(actions.toggleAuthenticated(true)).toMatchSnapshot();
  });
  test('toggleLocationProvided', () => {
    expect(actions.toggleFetching(true)).toMatchSnapshot();
  });
});
