import React, { Component } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

import { GraphTile } from '../../styled/Layout';

const NavigationChart = ({ navData }) =>
  <GraphTile>
    <h3 style={{textAlign: 'center'}}>Navigation Iniated</h3>
    <LineChart
      width={500}
      height={250}
      data={navData}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="WIC" stroke="#8884d8" />
      <Line type="monotone" dataKey="SNAP" stroke="#82ca9d" />
    </LineChart>
  </GraphTile>;

export default NavigationChart;
