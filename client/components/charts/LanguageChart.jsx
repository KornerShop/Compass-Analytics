import React, { Component } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { GraphHeading, GraphTile } from '../../styled/Layout';

const LanguageChart = ({ langData }) =>
  <div style={{margin: '0 2em'}}>
    <GraphHeading>Language Spoken</GraphHeading>
    <GraphTile>
      <PieChart width={500} height={250}>
        <Pie
          data={langData}
          dataKey="value"
          nameKey="_id"
          cx={245}
          cy={125}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </GraphTile>
  </div>;

export default LanguageChart;
