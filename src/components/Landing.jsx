import React from 'react';
import LanguageChart from './charts/Language';
import ZipCodeChart from './charts/ZipCode';
import OfficeChart from './charts/Office';
import NavigationChart from './charts/Navigation';

const Landing = props =>
  <div>
    <LanguageChart
      socket={props.socket}
    />
    <OfficeChart
      socket={props.socket}
    />
    <NavigationChart
      socket={props.socket}
    />
    <ZipCodeChart
      socket={props.socket}
    />
  </div>;

export default Landing;
