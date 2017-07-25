import React from 'react';
import { Provider } from 'react-redux';
import SocketClient from 'socket.io-client';

import { NGROK_ADDR } from '../../config/envars';

import global from '../styled/global';

import configureStore from '../redux/store';

import Root from './Root';

const store = configureStore();

const App = () => {
  const socket = SocketClient(NGROK_ADDR);
  return (
    <Provider store={store}>
      <Root socket={socket} />
    </Provider>
  )
};

export default App;
