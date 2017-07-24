import React from 'react'
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from './App'

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

const Root = ({ store }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => {
        console.log(`logoutUser: ${this.state.logoutUser}`);
        console.log(`langData: ${this.state.langData}`);
        console.log(`navData: ${this.state.navData}`);
        console.log(`officeData: ${this.state.officeData}`);
        console.log(`zipData: ${this.state.zipData}`);
        return this.state.authenticated
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
          : <Redirect to="/login" />;
      }}
    />
    <Route
      path="/login"
      component={() =>
        this.state.authenticated
          ? <Redirect to="/" />
          : <Login
            loginUser={this.loginUser}
            errorMessage={this.state.errorMessage}
            resetErrorMessage={this.resetErrorMessage}
            />}
    />
    <Route component={FourOhFour} />
  </Switch>
)

export default Router;
