import React from 'react';
import SocketClient from 'socket.io-client';

import { NGROK_ADDR } from '../../config/envars';

import global from '../styled/global';

import store from '../redux/store';

import Root from './Root';

const App = () => {
  const socket = SocketClient(NGROK_ADDR);
  return (
    <Provider store={store}>
      <Root socket={socket} />
    </Provider>
  )
};

export default App;
