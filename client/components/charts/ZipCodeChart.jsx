import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

import { GraphHeading, GraphTile } from '../../styled/Layout';

const ZipCodeChart = ({ zipData }) =>
  <div style={{ margin: '0 2em' }}>
    <GraphHeading>Zip Codes Represented</GraphHeading>
    <GraphTile>
      <BarChart
        width={500}
        height={250}
        data={zipData}
        margin={{
          top: 60,
          right: 40,
          left: -15,
          bottom: 0,
        }}
      >
        <XAxis dataKey="_id" stroke="#8884d8" />
        <YAxis />
        <Tooltip
          wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}
        />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: '#f5f5f5',
            border: '1px solid #d5d5d5',
            borderRadius: 3,
            lineHeight: '40px',
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar
          type="monotone"
          dataKey="count"
          fill="#8884d8"
          barSize={30}
        />
      </BarChart>
    </GraphTile>
  </div>;

export default ZipCodeChart;
