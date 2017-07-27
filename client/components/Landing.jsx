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
import styled from 'styled-components';

import Page from './Page';
import Graph from './Graph';
import CubeGrid from '../styled/CubeGrid';

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-content: center;
  background-color: #f3f3f3;
`;

class Landing extends Component {
  componentDidMount() {
    window.onbeforeunload = async () => {
      await this.props.verifyToken();
      this.props.listenForChartData(this.props.socket);
    };
  }
  render() {
    return (
      <Page logoutUser={this.props.logoutUser}>
        {this.props.langData &&
          this.props.officeData &&
          this.props.navData &&
          this.props.zipData
            ? <Graph
              langData={this.props.langData}
              officeData={this.props.officeData}
              navData={this.props.navData}
              zipData={this.props.zipData}
              />
          : <LoadingWrapper>
              <CubeGrid color="#FF0080" size={50} />
            </LoadingWrapper>}
      </Page>
    );
  }
}

Landing.defaultProps = {
  langData: [],
  navData: [],
  officeData: [],
  zipData: [],
};

Landing.propTypes = {
  socket: object.isRequired,
  authenticated: bool.isRequired,
  fetching: bool.isRequired,
  verifyToken: func.isRequired,
  logoutUser: func.isRequired,
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
  listenForChartData: func.isRequired,
  location: object.isRequired,
};

export default Landing;
