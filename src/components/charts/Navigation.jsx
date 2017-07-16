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

class NavigationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navData: null,
    };
    this.updateNav = this.updateNav.bind(this);
  }
  componentDidMount() {
    this.updateNav();
  }
  updateNav() {
    this.props.socket.on('populate-nav-data', navData => {
      this.setState({ navData });
    });
  }
  render() {
    return (
      <div>
        {this.state.navData
          ? <LineChart
              width={730}
              height={250}
              data={this.state.navData}
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
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default NavigationChart;
