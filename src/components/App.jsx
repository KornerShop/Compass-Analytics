import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Landing from './Landing';

const H404 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: tomato;
  font-size: 80px;
  text-align: center;
  margin: 250px;
`;

const FourOhFour = () => <H404>You look lost...</H404>;

const App = () =>
  <div>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={FourOhFour} />
    </Switch>
  </div>;

export default App;
