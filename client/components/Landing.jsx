import React from 'react';
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
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${props => (props.loading ? '3em 0 0 0' : '3em 0 5em 0')};
`;

const Heading = styled.h1`
  margin: 0;
  text-transform: uppercase;
`;

const Landing = ({
  langData,
  navData,
  officeData,
  zipData,
  populateLang,
  populateNav,
  populateOffice,
  populateZip,
}) =>
  <Page>
    <Header loading={!(langData && navData && officeData && zipData)}>
      <Heading>Compass Analytics</Heading>
    </Header>
    {langData && navData && officeData && zipData
      ? <GraphLayout>
        <LanguageChart
          langData={langData}
          populateLang={populateLang}
        />
        <OfficeChart
          officeData={officeData}
          populateOffice={populateOffice}
        />
        <NavigationChart
          navData={navData}
          populateNav={populateNav}
        />
        <ZipCodeChart zipData={zipData} populateZip={populateZip} />
      </GraphLayout>
      : <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '70vh',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
        }}
        >
        <CubeGrid color="#FF0080" size={60} />
        </div>}
  </Page>;

export default Landing;
