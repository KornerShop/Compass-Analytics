import React from 'react';
import { string, arrayOf, shape, oneOf } from 'prop-types';
import { GraphLayout, GraphRow } from '../styled/Layout';
import LanguageChart from './charts/LanguageChart';
import ZipCodeChart from './charts/ZipCodeChart';
import OfficeChart from './charts/OfficeChart';
import NavigationChart from './charts/NavigationChart';

const Graph = ({ langData, officeData, navData, zipData }) =>
  <GraphLayout>
    <GraphRow>
      <LanguageChart langData={langData} />
      <OfficeChart officeData={officeData} />
    </GraphRow>
    <GraphRow>
      <NavigationChart navData={navData} />
      <ZipCodeChart zipData={zipData} />
    </GraphRow>
  </GraphLayout>;

Graph.defaultProps = {
  langData: [],
  navData: [],
  officeData: [],
  zipData: [],
};

Graph.propTypes = {
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
};

export default Graph;
