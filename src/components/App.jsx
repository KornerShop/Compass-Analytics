import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SocketClient from 'socket.io-client';
import styled from 'styled-components';

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
      navigationData: null,
      zipData: null,
    };
    // envars needed (definePlugin)
    this.socket = SocketClient('http://localhost:8080');
    this.updateLanguageData = this.updateLanguageData.bind(this);
    this.updateOfficeData = this.updateOfficeData.bind(this);
    this.updateNavigationData = this.updateNavigationData.bind(this);
    this.updateZipData = this.updateZipData.bind(this);
  }
  updateLanguageData() {
    this.socket.on('updateLang', data => {
      this.setState({ langData: data });
    });
  }
  updateOfficeData() {
    this.socket.on('updateOffice', data => {
      this.setState({ officeData: data });
    });
  }
  updateNavigationData() {
    this.socket.on('updateNav', data => {
      this.setState({ navigationData: data });
    });
  }
  updateZipData() {
    this.socket.on('updateZip', data => {
      this.setState({ zipData: data });
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
                navData={this.state.officeData}
                officeData={this.state.officeData}
                zipData={this.state.zipData}
                updateLang={this.updateLanguageData}
                updateNav={this.updateNavigationData}
                updateOffice={this.updateOfficeData}
                updateZip={this.updateZipData}
              />}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;
