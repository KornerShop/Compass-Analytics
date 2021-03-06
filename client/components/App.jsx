import React, { Component } from 'react';
import {
  string,
  number,
  bool,
  object,
  func,
  arrayOf,
  shape,
  oneOf,
} from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import globalStyle from '../styled/global';

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

class App extends Component {
  async componentDidMount() {
    await this.props.verifyToken();
    this.props.listenForChartData();
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
                  location={this.props.location}
                  authenticated={this.props.authenticated}
                  fetching={this.props.fetching}
                  logoutUser={this.props.logoutUser}
                  langData={this.props.langData}
                  officeData={this.props.officeData}
                  navData={this.props.navData}
                  zipData={this.props.zipData}
                />
              : <Redirect to="/login" />}
        />
        <Route
          path="/login"
          render={() =>
            this.props.authenticated
              ? <Redirect exact to="/" />
              : <Login
                  location={this.props.location}
                  fetching={this.props.fetching}
                  loginUser={this.props.loginUser}
                  errorMessage={this.props.errorMessage}
                />}
        />
        <Route component={FourOhFour} />
      </Switch>
    );
  }
}

App.propTypes = {
  authenticated: bool.isRequired,
  fetching: bool.isRequired,
  errorMessage: string.isRequired,
  langData: arrayOf(
    shape({
      _id: oneOf(['English', 'Spanish']).isRequired,
      value: number.isRequired,
    }),
  ),
  officeData: arrayOf(
    shape({
      date: string.isRequired,
      office: oneOf(['SNAP', 'WIC']),
    }),
  ),
  navData: arrayOf(
    shape({
      date: string.isRequired,
      office: oneOf(['SNAP', 'WIC']),
    }),
  ),
  zipData: arrayOf(
    shape({
      _id: string.isRequired,
      count: number.isRequired,
    }),
  ),
  loginUser: func.isRequired,
  verifyToken: func.isRequired,
  logoutUser: func.isRequired,
  listenForChartData: func.isRequired,
  location: object.isRequired,
};

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
  loginUser: bindActionCreators(loginUser, dispatch),
  verifyToken: bindActionCreators(verifyToken, dispatch),
  logoutUser: bindActionCreators(logoutUser, dispatch),
  listenForChartData: bindActionCreators(
    listenForChartData,
    dispatch,
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
