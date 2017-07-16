import React, { Component } from 'react';

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

class OfficeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officeData: null,
    };
    this.updateOffice = this.updateOffice.bind(this);
  }
  componentDidMount() {
    this.updateOffice();
  }
  updateOffice() {
    this.props.socket.on('populate-office-data', officeData => {
      this.setState({ officeData });
    });
  }
  render() {
    return (
      <div>
        {this.state.officeData
          ? <AreaChart
              width={600}
              height={400}
              data={this.state.officeData}
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
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default OfficeChart;
