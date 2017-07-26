import React from 'react';
import { string, arrayOf, shape, oneOf } from 'prop-types';

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { GraphHeading, GraphTile } from '../../styled/Layout';

const OfficeChart = ({ officeData }) =>
  <div style={{ margin: '0 2em' }}>
    <GraphHeading>Office Searched</GraphHeading>
    <GraphTile>
      <AreaChart
        width={510}
        height={250}
        data={officeData}
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
        <Area
          type="monotone"
          dataKey="WIC"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="SNAP"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </GraphTile>
  </div>;

OfficeChart.defaultProps = {
  officeData: [],
};

OfficeChart.proptTypes = {
  officeData: arrayOf(
    shape({
      date: string.isRequired,
      office: oneOf(['SNAP', 'WIC']),
    }),
  ),
};

export default OfficeChart;
