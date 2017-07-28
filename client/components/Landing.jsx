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

const Landing = ({
  logoutUser,
  authenticated,
  langData,
  zipData,
  navData,
  officeData,
}) =>
  <Page logoutUser={logoutUser}>
    {authenticated && langData && officeData && navData && zipData
      ? <Graph
          langData={langData}
          officeData={officeData}
          navData={navData}
          zipData={zipData}
        />
      : <LoadingWrapper>
          <CubeGrid color="#FF0080" size={50} />
        </LoadingWrapper>}
  </Page>;

Landing.defaultProps = {
  langData: [],
  navData: [],
  officeData: [],
  zipData: [],
};

Landing.propTypes = {
  authenticated: bool.isRequired,
  fetching: bool.isRequired,
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
  location: object.isRequired,
};

export default Landing;
