import React, { Component } from 'react';
import {
  string,
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
        {this.props.fetching
          ? <LoadingWrapper>
              <CubeGrid color="#FF0080" size={50} />
            </LoadingWrapper>
          : <Graph
              langData={this.props.langData}
              officeData={this.props.officeData}
              navData={this.props.navData}
              zipData={this.props.zipData}
            />}
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
  fetching: bool.isRequired,
  verifyToken: func.isRequired,
  logoutUser: func.isRequired,
  langData: arrayOf(
    shape({
      language: oneOf(['English', 'Spanish']).isRequired,
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
      zipCode: string.isRequired,
    }),
  ),
  listenForChartData: func.isRequired,
};

export default Landing;
