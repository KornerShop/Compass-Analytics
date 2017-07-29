import rootReducer from '../index';
import initialState from '../../initialState';
import * as actions from '../../actions/actions';
import * as types from '../../actions/types';

let appState = initialState;

describe('reducers', () => {
  test('@@INIT', () => {
    const state = rootReducer(undefined, {});
    expect(state).toEqual(appState);
  });
  test('TOGGLE_AUTHENTICATED', () => {
    const state = rootReducer(
      appState,
      actions.toggleAuthenticated(true),
    );
    expect(state).toEqual({ ...appState, authenticated: true });
  });
  test('UPDATE_ERROR_MESSAGE', () => {
    appState = { ...appState, authenticated: true };
    const state = rootReducer(
      appState,
      actions.updateErrorMessage('No user with the given username'),
    );
    expect(state).toEqual({
      ...appState,
      errorMessage: 'No user with the given username',
    });
  });
});
