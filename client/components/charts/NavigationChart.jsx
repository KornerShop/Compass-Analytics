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
import CubeGrid from '../../styled/CubeGrid';

class NavigationChart extends Component {
  componentDidMount() {
    this.props.populateNav();
  }
  render() {
    return (
      <GraphTile>
        {this.props.navData
          ? <LineChart
              width={580}
              height={250}
              data={this.props.navData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="WIC" stroke="#8884d8" />
              <Line type="monotone" dataKey="SNAP" stroke="#82ca9d" />
            </LineChart>
          : <CubeGrid color="#FF0080" size={60} />}
      </GraphTile>
    );
  }
}

export default NavigationChart;
