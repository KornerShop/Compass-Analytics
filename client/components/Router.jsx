import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from './App';

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

const Router = ({
  authenticated,
  logoutUser,
  langData,
  navData,
  officeData,
  zipData,
  populateLangData,
  populateOfficeData,
  populateNavData,
  populateZipData,
}) =>
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        this.state.authenticated
          ? <Landing
            logoutUser={logoutUser}
            langData={langData}
            officeData={officeData}
            navData={navData}
            zipData={zipData}
            populateLang={populateLangData}
            populateOffice={populateOfficeData}
            populateNav={populateNavData}
            populateZip={populateZipData}
            />
          : <Redirect to="/login" />}
    />
    <Route
      path="/login"
      component={() =>
        authenticated
          ? <Redirect to="/" />
          : <Login
              loginUser={loginUser}
              errorMessage={errorMessage}
              resetErrorMessage={resetErrorMessage}
            />}
    />
    <Route component={FourOhFour} />
  </Switch>;

export default Router;
