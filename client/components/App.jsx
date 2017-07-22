import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SocketClient from 'socket.io-client';
import styled from 'styled-components';

import { NGROK_ADDR } from '../../config/envars';

import global from '../styled/global';

import Login from './Login';
import Landing from './Landing';

const H404 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: tomato;
  font-size: 80px;
  text-align: center;
  margin: 250px;
`;

const FourOhFour = () => <H404>You look lost...</H404>;

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
      authenticated: true,
    };
    this.loginError = errorMessage => ({
      fetching: false,
      authenticated: false,
      errorMessage,
    });
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.fetchChartData = this.fetchChartData.bind(this);
  }
  async componentDidMount() {
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
        if (response.status >= 200 && response.status < 300) {
          const { token: { newToken } } = await response.json();
          localStorage.setItem('token', newToken);
          return this.setState(this.receiveLogin);
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
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.authenticated
                ? <Landing
                  logoutUser={this.logoutUser}
                  langData={this.state.langData}
                  officeData={this.state.officeData}
                  navData={this.state.navData}
                  zipData={this.state.zipData}
                  populateLang={this.populateLangData}
                  populateOffice={this.populateOfficeData}
                  populateNav={this.populateNavData}
                  populateZip={this.populateZipData}
                  />
                : <Redirect to="/login" />}
          />
          <Route
            path="/login"
            component={() =>
              this.state.authenticated
                ? <Redirect to="/" />
                : <Login
                  loginUser={this.loginUser}
                  errorMessage={this.state.errorMessage}
                  />}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
