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
    this.state = {
      langData: null,
      officeData: null,
      navData: null,
      zipData: null,
    };
    // envars needed (definePlugin)
    /* eslint-disable no-undef */
    this.socket = SocketClient(NGROK_ADDR);
    this.populateLangData = this.populateLangData.bind(this);
    this.populateOfficeData = this.populateOfficeData.bind(this);
    this.populateNavData = this.populateNavData.bind(this);
    this.populateZipData = this.populateZipData.bind(this);
  }
  populateLangData() {
    this.socket.on('populate-lang-data', langData => {
      this.setState({ langData });
    });
  }
  populateOfficeData() {
    this.socket.on('populate-office-data', officeData => {
      this.setState({ officeData });
    });
  }
  populateNavData() {
    this.socket.on('populate-nav-data', navData => {
      this.setState({ navData });
    });
  }
  populateZipData() {
    this.socket.on('populate-zip-data', zipData => {
      this.setState({ zipData });
    });
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '100vh',
        }}
      >
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
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
