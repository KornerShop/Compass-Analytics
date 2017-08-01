import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { SocketIO, Server } from 'mock-socket';

import initialState from '../../initialState';

import {
  toggleFetching,
  toggleAuthenticated,
  updateErrorMessage,
  populateLangData,
  populateOfficeData,
  populateNavData,
  populateZipData,
} from '../actions';
import {
  loginUser,
  verifyToken,
  logoutUser,
  resetErrorMessage,
  listenForChartData
} from '../actionCreators';

describe('actionCreators', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const serverURL = process.env.NODE_ENV === 'production'
    ? 'https://compass-analytics.now.sh'
    : 'http://localhost:8080';

  global.localStorage = {
    setItem: jest.fn(),
    getItem: () => 'asdf',
    removeItem: jest.fn(),
  };

  afterAll(() => nock.cleanAll());

  describe('loginUser', () => {
    const validCreds = {
      username: 'ycleptkellan',
      password: 'password1',
    };

    const invalidCreds = {
      username: 'panda',
      password: 'bear',
    };

    it('dispatches correct actions when creds exist', async () => {
      nock(serverURL, {
        reqHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .post('/users/login', validCreds)
        .reply(200, {
          token: 'asdf',
        });
      const expectedActions = [
        toggleFetching(true),
        toggleAuthenticated(false),
        toggleAuthenticated(true),
        toggleFetching(false),
        updateErrorMessage(''),
      ];
      const store = mockStore(initialState);
      await store.dispatch(loginUser(validCreds));
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'token',
        'asdf',
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches correct actions when creds do not exist', async () => {
      nock(serverURL, {
        reqHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .post('/users/login', invalidCreds)
        .reply(401, {
          errorMessage: 'No user with the given username',
        });
      const expectedActions = [
        toggleFetching(true),
        toggleAuthenticated(false),
        toggleFetching(false),
        toggleAuthenticated(false),
        updateErrorMessage('No user with the given username'),
      ];
      const store = mockStore(initialState);
      await store.dispatch(loginUser(invalidCreds));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('verifyToken', () => {
    it('dispatches correct actions when token is valid', async () => {
      nock(serverURL, {
        reqHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer asdf',
        },
      })
        .post('/users/verify')
        .reply(200, {
          token: 'jkl;',
        });
      const expectedActions = [
        toggleFetching(true),
        toggleAuthenticated(false),
        toggleAuthenticated(true),
        toggleFetching(false),
        updateErrorMessage(''),
      ];
      const store = mockStore(initialState);
      await store.dispatch(verifyToken());
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'token',
        'jkl;',
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches correct actions when token is not valid', async () => {
      nock(serverURL, {
        reqHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer qwerty',
        },
      })
        .post('/users/verify')
        .reply(401, {
          errorMessage: 'Invalid token',
        });
      const expectedActions = [
        toggleFetching(true),
        toggleAuthenticated(false),
        toggleFetching(false),
        toggleAuthenticated(false),
        updateErrorMessage('Invalid token'),
      ];
      const store = mockStore(initialState);
      await store.dispatch(verifyToken());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('logoutUser', () => {
    it('dispatches correct actions when user elects to log out', async () => {
      const expectedActions = [
        toggleFetching(true),
        toggleAuthenticated(true),
        toggleAuthenticated(false),
        toggleFetching(false),
      ];
      const store = mockStore(initialState);
      await store.dispatch(logoutUser());
      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  xdescribe('listenForChartData', () => {
    it('listens for each event, dispatches appropriate actions', async () => {
      const store = mockStore(initialState)
      const langData = [
        {
          _id: 'English',
          value: 15,
        },
        {
          _id: 'Spanish',
          value: 27,
        },
      ];
      const officeData = [
        {
          _id: {
            office: 'SNAP',
            date: '7/29/2017',
          },
          count: 3,
        },
      ];
      const navData = [
        {
          _id: {
            office: 'SNAP',
            date: '7/29/2017',
          },
          count: 3,
        },
      ];
      const zipData = [
        {
          _id: 95404,
          count: 2,
        },
      ];
      const expectedActions = [
        populateLangData(langData),
        populateOfficeData(officeData),
        populateNavData(navData),
        populateZipData(zipData)
      ];
      const mockServer = new Server(serverURL);
      mockServer.on('connection', mockSocket => {
        mockSocket.emit('populate-lang-data', 'langData');
        mockSocket.emit('populate-office-data', officeData);
        mockSocket.emit('populate-nav-data', navData);
        mockSocket.emit('populate-zip-data', zipData);
      });
      global.io = SocketIO;
      await store.dispatch(listenForChartData());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
