import React, { Component } from 'react';
import { Provider } from 'react-redux'
import SocketClient from 'socket.io-client';
import styled from 'styled-components';

import { NGROK_ADDR } from '../../config/envars';

import global from '../styled/global';

import Router from './Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      fetching: true,
      errorMessage: '',
      langData: null,
      officeData: null,
      navData: null,
      zipData: null,
    };
    /* eslint-disable no-undef */
    this.socket = SocketClient(NGROK_ADDR);
    this.requestLogin = {
      fetching: true,
      authenticated: false,
    };
    this.receiveLogin = {
      fetching: false,
      authenticated: true,
    };
    this.requestLogout = {
      fetching: true,
      authenticated: true,
    };
    this.receiveLogout = {
      fetching: false,
      authenticated: false,
    };
    this.loginError = errorMessage => ({
      fetching: false,
      authenticated: false,
      errorMessage,
    });
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.fetchChartData = this.fetchChartData.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.resetErrorMessage = this.resetErrorMessage.bind(this);
  }
  componentDidMount() {
    console.log('app mounting');
    this.verifyToken();
  }
  async loginUser({ username, password }) {
    this.setState(this.requestLogin);
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status >= 200 && response.status < 300) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        this.setState(this.receiveLogin);
      } else {
        this.setState(this.loginError('Wrong credentials'));
      }
    } catch (err) {
      console.error(err);
    }
  }
  logoutUser() {
    this.setState(this.requestLogout);
    localStorage.removeItem('token');
    this.setState(this.receiveLogout);
  }
  fetchChartData() {
    this.socket.on('populate-lang-data', langData => {
      this.setState({
        langData,
      });
    });
    this.socket.on('populate-office-data', officeData => {
      this.setState({
        officeData,
      });
    });
    this.socket.on('populate-nav-data', navData => {
      this.setState({
        navData,
      });
    });
    this.socket.on('populate-zip-data', zipData => {
      this.setState({
        zipData,
      });
    });
  }
  async verifyToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('/users/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        if (response.status >= 200 && response.status < 300) {
          const { token: { newToken } } = await response.json();
          this.setState(this.receiveLogin);
          this.fetchChartData();
          return localStorage.setItem('token', newToken);
        }
        return this.setState(this.loginError(response.statusText));
      } catch (err) {
        console.error(err);
      }
    }
    this.setState({
      authenticated: false,
      fetching: false,
    });
    this.fetchChartData();
  }
  resetErrorMessage() {
    this.setState({ errorMessage: '' });
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
