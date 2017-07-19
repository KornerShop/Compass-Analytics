import React, { Component } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

import { GraphTile } from '../../styled/Layout';

const LanguageChart = ({ langData }) =>
  <GraphTile>
    <h3 style={{textAlign: 'center'}}>Language Spoken</h3>
    <PieChart
      width={500}
      height={250}
    >
      <Pie
        data={langData}
        dataKey="value"
        nameKey="_id"
        cx={275}
        cy={125}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
      <Tooltip />
    </PieChart>
  </GraphTile>;

export default LanguageChart;
