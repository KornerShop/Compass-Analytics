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

class LanguageChart extends Component {
  componentDidMount() {
    this.props.updateLang();
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.langData
          ? <LineChart
              width={730}
              height={250}
              data={this.props.langData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default LanguageChart;
