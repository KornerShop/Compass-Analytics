import React from 'react';
import { number, arrayOf, shape, oneOf } from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

import { GraphHeading, GraphTile } from '../../styled/Layout';

const LanguageChart = ({ langData }) =>
  <div style={{ margin: '0 2em' }}>
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

LanguageChart.defaultProps = {
  langData: [],
};

LanguageChart.propTypes = {
  langData: arrayOf(
    shape({
      _id: oneOf(['English', 'Spanish']).isRequired,
      value: number.isRequired,
    }),
  ),
};

export default LanguageChart;
