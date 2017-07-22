import React from 'react';
import styled from 'styled-components';

import media from '../styled/media';

import CubeGrid from '../styled/CubeGrid';
import { GraphLayout, GraphRow } from '../styled/Layout';
import LanguageChart from './charts/LanguageChart';
import ZipCodeChart from './charts/ZipCodeChart';
import OfficeChart from './charts/OfficeChart';
import NavigationChart from './charts/NavigationChart';

const Page = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  background-color: #f3f3f3;
`;

const Header = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  width: 100%;
  background-color: white;
  box-shadow: 1px 1px 40px 8px rgba(176, 190, 197, 1);
  z-index: 1;

  ${media.tablet`
    justify-content: space-around;
  `}
`;

const LogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .5em 1.5em .5em 1.5em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .25);
  border-radius: 1em;
  margin-right: 2em;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, .25);
    transform: translateY(1px)
  }

  &:active {
    box-shadow: 2px 2px 4px rgba(0,0,0,.25);
    transform: translateY(5px)
  }
`

const LogoutIcon = styled.img`
  height: 1em;
  width: 1em;

  ${media.tablet`
  `}
`

const Heading = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 1.05em;
  font-weight: 700;
  letter-spacing: .75em;
  padding-left: 4.5em
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-content: center;
  background-color: #f3f3f3;
`;

const Landing = ({ logoutUser, langData, navData, officeData, zipData }) =>
  <Page>
    <Header loading={!(langData && navData && officeData && zipData)}>
      <Heading>Compass Analytics</Heading>
      <LogoutButton onClick={logoutUser}>
        <LogoutIcon
          src="https://image.flaticon.com/icons/svg/157/157938.svg"
          alt="sign out"
        />
      </LogoutButton>
    </Header>
    {langData && navData && officeData && zipData
      ? <GraphLayout>
        <GraphRow>
          <LanguageChart langData={langData} />
          <OfficeChart officeData={officeData} />
        </GraphRow>
        <GraphRow>
            <NavigationChart navData={navData} />
            <ZipCodeChart zipData={zipData} />
          </GraphRow>
        </GraphLayout>
      : <LoadingWrapper>
          <CubeGrid color="#FF0080" size={50} />
        </LoadingWrapper>}
  </Page>;

export default Landing;
