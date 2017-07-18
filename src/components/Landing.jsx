import React from 'react';
import LanguageChart from './charts/Language';
import ZipCodeChart from './charts/ZipCode';
import OfficeChart from './charts/Office';
import NavigationChart from './charts/Navigation';

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
  <div style={{ maxWidth: '80%' }}>
    <LanguageChart langData={langData} populateLang={populateLang} />
    <OfficeChart
      officeData={officeData}
      populateOffice={populateOffice}
    />
    <NavigationChart navData={navData} populateNav={populateNav} />
    <ZipCodeChart zipData={zipData} populateZip={populateZip} />
  </div>;

export default Landing;
