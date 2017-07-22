import React, { Component } from 'react';
import styled from 'styled-components';

import CubeGrid from '../styled/CubeGrid';
import { GraphLayout } from '../styled/Layout';
import LanguageChart from './charts/LanguageChart';
import ZipCodeChart from './charts/ZipCodeChart';
import OfficeChart from './charts/OfficeChart';
import NavigationChart from './charts/NavigationChart';

const Page = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  background-color: #F3F3F3;
`;

const Header = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  padding: 1em 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 40px 2px rgba(176,190,197,1);
  z-index: 1;
`;

const Heading = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 400;
  letter-spacing: .75em;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100%;
  justify-content: center;
  align-content: center;
`;

const Landing = ({
  langData,
  navData,
  officeData,
  zipData
}) => <Page>
  <Header loading={!(langData && navData && officeData && zipData)}>
    <Heading>Compass Analytics</Heading>
  </Header>
  {langData && navData && officeData && zipData
    ? <GraphLayout>
      <LanguageChart
        langData={langData}
      />
      <OfficeChart
        officeData={officeData}
      />
      <NavigationChart
        navData={navData}
      />
      <ZipCodeChart zipData={zipData} />
    </GraphLayout>
    : <LoadingWrapper>
      <CubeGrid color="#FF0080" size={60} />
    </LoadingWrapper>}
</Page>

export default Landing;
