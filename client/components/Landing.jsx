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
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${props => (props.loading ? '3em 0 0 0' : '3em 0 3em 0')};
`;

const Heading = styled.h1`
  margin: 0;
  ${'' /* text-transform: uppercase; */}
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100%;
  justify-content: center;
  align-content: center;
`

class Landing extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.populateLang();
    this.props.populateOffice();
    this.props.populateNav();
    this.props.populateZip();
  }
  render() {
    return (
      <Page>
        <Header loading={!(this.props.langData && this.props.navData && this.props.officeData && this.props.zipData)}>
          <Heading>Compass Analytics</Heading>
        </Header>
        {this.props.langData && this.props.navData && this.props.officeData && this.props.zipData
          ? <GraphLayout>
            <LanguageChart
              langData={this.props.langData}
            />
            <OfficeChart
              officeData={this.props.officeData}
            />
            <NavigationChart
              navData={this.props.navData}
            />
            <ZipCodeChart zipData={this.props.zipData} />
          </GraphLayout>
          : <LoadingWrapper>
            <CubeGrid color="#FF0080" size={60} />
          </LoadingWrapper>}
      </Page>
    )
  }
}

export default Landing;
