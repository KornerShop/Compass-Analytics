import React, { Component } from 'react';

import { PieChart, Pie, Tooltip } from 'recharts';

class LanguageChart extends Component {
  componentDidMount() {
    this.props.populateLang();
  }
  render() {
    return (
      <div>
        {this.props.langData
          ? <PieChart width={600} height={500}>
            <Pie
              data={this.props.langData}
              dataKey="value"
              nameKey="_id"
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default LanguageChart;
