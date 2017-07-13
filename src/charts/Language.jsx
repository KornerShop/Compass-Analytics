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

class LanguageChart extends Component {
  componentWillMount() {
    this.props.updateLang();
  }
  render() {
    console.log(`langData: ${this.props.langData}`)
    return (
      <div>
        {this.props.langData
          ? <BarChart width={600} height={300} data={this.props.langData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar type="monotone" dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default LanguageChart;
