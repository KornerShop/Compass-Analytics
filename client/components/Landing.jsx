import React from 'react';
import styled from 'styled-components';

import Page from './Page';
import Graph from './Graph';
import CubeGrid from '../styled/CubeGrid';

const LoadingWrapper = styled.div`
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
  langData,
  navData,
  officeData,
  zipData,
}) =>
  <Page logoutUser={logoutUser}>
    {langData && navData && officeData && zipData
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

export default Landing;
