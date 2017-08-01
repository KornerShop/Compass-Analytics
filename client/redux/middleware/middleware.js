import * as types from '../actions/types';

const setToken = token => localStorage.setItem('token', token);

const getToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

export const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};
