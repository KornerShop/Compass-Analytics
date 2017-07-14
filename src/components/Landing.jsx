import React from 'react';
import LanguageChart from './charts/Language';
import ZipCodeChart from './charts/ZipCode';
import OfficeChart from './charts/Office';
import NavigationChart from './charts/Navigation';

const Landing = props =>
  <div>
    <LanguageChart
      langData={props.langData}
      populateLang={props.populateLang}
    />
    <OfficeChart
      officeData={props.officeData}
      populateOffice={props.populateOffice}
    />
    <NavigationChart
      navData={props.navData}
      populateNav={props.populateNav}
    />
    <ZipCodeChart
      zipData={props.zipData}
      populateZip={props.populateZip}
    />
  </div>;

export default Landing;
