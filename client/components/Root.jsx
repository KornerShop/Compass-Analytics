import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { resetErrorMessage } from '../redux/actions/actions';
import {
  loginUser,
  verifyToken,
  logoutUser,
  listenForChartData,
} from '../redux/actions/actionCreators';

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

class Root extends Component {
  componentDidMount() {
    this.props.listenForChartData(this.props.socket);
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            this.props.authenticated
              ? <Landing
                socket={this.props.socket}
                fetching={this.props.fetching}
                verifyToken={this.props.verifyToken}
                logoutUser={this.props.logoutUser}
                langData={this.props.langData}
                officeData={this.props.officeData}
                navData={this.props.navData}
                zipData={this.props.zipData}
                listenForChartData={this.props.listenForChartData}
                />
              : <Redirect to="/login" />}
        />
        <Route
          path="/login"
          component={() =>
            this.props.authenticated
              ? <Redirect to="/" />
              : <Login
                  fetching={this.props.fetching}
                  loginUser={this.props.loginUser}
                  errorMessage={this.props.errorMessage}
                  resetErrorMessage={this.props.resetErrorMessage}
                />}
        />
        <Route component={FourOhFour} />
      </Switch>
    );
  }
}

const mapStateToProps = ({
  authenticated,
  fetching,
  errorMessage,
  langData,
  officeData,
  navData,
  zipData,
}) => ({
  authenticated,
  fetching,
  errorMessage,
  langData,
  officeData,
  navData,
  zipData,
});

const mapDispatchToProps = dispatch => ({
  loginUser: bindActionCreators(dispatch, loginUser),
  verifyToken: bindActionCreators(dispatch, verifyToken),
  logoutUser: bindActionCreators(dispatch, logoutUser),
  resetErrorMessage: bindActionCreators(dispatch, resetErrorMessage),
  listenForChartData: bindActionCreators(
    dispatch,
    listenForChartData,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
