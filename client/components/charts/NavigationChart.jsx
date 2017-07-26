import React from 'react';
import { string, arrayOf, shape, oneOf } from 'prop-types';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

import { GraphHeading, GraphTile } from '../../styled/Layout';

const NavigationChart = ({ navData }) =>
  <div style={{ margin: '0 2em' }}>
    <GraphHeading>Navigation Initiated</GraphHeading>
    <GraphTile>
      <LineChart
        width={500}
        height={250}
        data={navData}
        margin={{
          top: 30,
          right: 60,
          left: 0,
          bottom: 20,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="WIC" stroke="#8884d8" />
        <Line type="monotone" dataKey="SNAP" stroke="#82ca9d" />
      </LineChart>
    </GraphTile>
  </div>;

NavigationChart.defaultProps = {
  navData: [],
};

NavigationChart.propTypes = {
  navData: arrayOf(
    shape({
      date: string.isRequired,
      office: oneOf(['SNAP', 'WIC']),
    }),
  ),
};

export default NavigationChart;
