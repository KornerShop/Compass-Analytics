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
    this.populateLanguageData = this.populateLanguageData.bind(this);
    this.populateOfficeData = this.populateOfficeData.bind(this);
    this.populateNavigationData = this.populateNavigationData.bind(this);
    this.populateZipData = this.populateZipData.bind(this);
  }
  populateLanguageData(){
    this.socket.on('populate-language-data', barChartData => {
      this.setState({ langData: barChartData });
    });
  }
  populateOfficeData() {
    this.socket.on('populate-office-data', data => {
      this.setState({ officeData: data });
    });
  }
  populateNavigationData() {
    this.socket.on('populate-nav-data', data => {
      this.setState({ navigationData: data });
    });
  }
  populateZipData() {
    this.socket.on('populate-zip-data', data => {
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
                navData={this.state.navigationData}
                officeData={this.state.officeData}
                zipData={this.state.zipData}
                populateLang={this.populateLanguageData}
                populateNav={this.populateNavigationData}
                populateOffice={this.populateOfficeData}
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
