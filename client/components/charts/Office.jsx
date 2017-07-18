import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import CubeGrid from '../../styled/CubeGrid';

class OfficeChart extends Component {
  componentDidMount() {
    this.props.populateOffice();
  }
  render() {
    return (
      <div>
        {this.props.officeData
          ? <AreaChart
            width={600}
            height={400}
            data={this.props.officeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
          : <CubeGrid color="#FF0080" size={60}/>}
      </div>
    );
  }
}

export default OfficeChart;
