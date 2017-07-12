import React from 'react';
import LanguageChart from '../charts/Language';
import ZipCodeChart from '../charts/ZipCode';
import OfficeChart from '../charts/Office';
import NavigationChart from '../charts/Navigation';

const Landing = props =>
  <div>
    {props.langData
      ? <LanguageChart
          langData={props.langData}
          updateLang={props.updateLang}
        />
      : <h1>Loading...</h1>}
    {props.officeData
      ? <OfficeChart
          officeData={props.officeData}
          updateOffice={props.updateOffice}
        />
      : <h1>Loading...</h1>}
    {props.navData
      ? <NavigationChart
          navData={props.navData}
          updateNav={props.updateNav}
        />
      : <h1>Loading...</h1>}
    {props.zipData
      ? <ZipCodeChart
          zipData={props.zipData}
          updateZip={props.updateZip}
        />
      : <h1>Loading...</h1>}
  </div>;

export default Landing;
