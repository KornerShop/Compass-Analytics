import React from 'react';

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

export default Graph;
