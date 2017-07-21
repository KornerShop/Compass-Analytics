import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SocketClient from 'socket.io-client';
import styled from 'styled-components';

import { NGROK_ADDR } from '../../config/envars';

import global from '../styled/global';

import { fetchConfig } from '../utilities/fetch';

import Login from '../containers/Login';
import Landing from '../containers/Landing';

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
      auth: {
        authenticated: localStorage.getItem('token'),
        fetching: false,
        errorMessage: '',
      },
      charts: {
        langData: null,
        officeData: null,
        navData: null,
        zipData: null,
      },
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
      authenticated: true
    };
    this.receiveLogout = {
      fetching: false,
      authenticated: true
    };
    this.loginError = errorMessage => ({
      fetching: false,
      authenticated: false,
      errorMessage
    });
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.populateLangData = this.populateLangData.bind(this);
    this.populateOfficeData = this.populateOfficeData.bind(this);
    this.populateNavData = this.populateNavData.bind(this);
    this.populateZipData = this.populateZipData.bind(this);
  }
  async loginUser({ username, password }) {
    this.setState(this.receiveLogin);
    try {
      const response = await fetch('/auth/login', config('POST', {
        username,
        password
      }));
      if (response.status >= 200 && response.status < 300) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        this.setState(this.receiveLogin);
      } else {
        this.setState(this.loginError(response.statusText));
      }
    } catch(err) {
      console.error(err)
    }
  }
  logoutUser() {
    this.setState(requestLogout);
    localStorage.removeItem('token');
    this.setState(receiveLogout);
  }
  populateLangData() {
    this.socket.on('populate-lang-data', langData => {
      this.setState({
        charts: {
          langData,
        },
      });
    });
  }
  populateOfficeData() {
    this.socket.on('populate-office-data', officeData => {
      this.setState({
        charts: {
          officeData,
        },
      });
    });
  }
  populateNavData() {
    this.socket.on('populate-nav-data', navData => {
      this.setState({
        charts: {
          navData,
        },
      });
    });
  }
  populateZipData() {
    this.socket.on('populate-zip-data', zipData => {
      this.setState({
        charts: {
          zipData,
        },
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
            component={() =>
              <Landing
                langData={this.state.langData}
                officeData={this.state.officeData}
                navData={this.state.navData}
                zipData={this.state.zipData}
                populateLang={this.populateLangData}
                populateOffice={this.populateOfficeData}
                populateNav={this.populateNavData}
                populateZip={this.populateZipData}
              />}
          />
          <Route exact path="/login" component={Login} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
