import React, { Component } from 'react';
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
      <Page logoutUser={logoutUser}>
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

export default Landing;
