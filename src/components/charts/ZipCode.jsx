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

class ZipCodeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipData: null,
    };
    this.updateZip = this.updateZip.bind(this);
  }
  componentDidMount() {
    this.updateZip();
  }
  updateZip() {
    this.props.socket.on('populate-zip-data', zipData => {
      this.setState({ zipData });
    });
  }
  render() {
    return (
      <div>
        {this.state.zipData
          ? <BarChart
              width={580}
              height={300}
              data={this.state.zipData}
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
          : <h1>Loading...</h1>}
      </div>
    );
  }
}
export default ZipCodeChart;
