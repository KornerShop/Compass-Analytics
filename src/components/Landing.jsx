import React from 'react';
import LanguageChart from '../charts/Language';
import ZipCodeChart from '../charts/ZipCode';
import OfficeChart from '../charts/Office';
import NavigationChart from '../charts/Navigation';

const Landing = props =>
  <div>
    <LanguageChart
      langData={props.langData}
      updateLang={props.updateLang}
    />
    <OfficeChart
      officeData={props.officeData}
      updateOffice={props.updateOffice}
    />
    <NavigationChart
      navData={props.navData}
      updateNav={props.updateNav}
    />
    <ZipCodeChart
      zipData={props.zipData}
      updateZip={props.updateZip}
    />
  </div>;

export default Landing;
