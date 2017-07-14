import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SocketClient from 'socket.io-client';
import styled from 'styled-components';

import { NGROK_ADDR } from '../../config/envars';

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
    // envars needed (definePlugin)
    /* eslint-disable no-undef */
    this.socket = SocketClient(NGROK_ADDR);
  }
  populateOfficeData() {
    this.socket.on('populate-office-data', officeData => {
      this.setState({ officeData });
    });
  }
  populateNavigationData() {
    this.socket.on('populate-nav-data', navigationData => {
      this.setState({ navigationData });
    });
  }
  populateZipData() {
    this.socket.on('populate-zip-data', zipData => {
      this.setState({ zipData });
    });
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Landing socket={this.socket} />}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
