import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { GraphTile } from '../../styled/Layout';

const OfficeChart = ({ officeData }) =>
  <GraphTile>
    <h3 style={{textAlign: 'center'}}>Office Searched</h3>
    <AreaChart
      width={500}
      height={250}
      data={officeData}
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
  </GraphTile>;

export default OfficeChart;
