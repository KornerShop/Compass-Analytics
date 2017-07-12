import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    // envars needed (definePlugin)
    this.socket = SocketClient('http://localhost:8080');
  }
  componentDidMount() {
    this.socket.on('data', data => {
      this.setState({ data });
    });
  }
  render() {
    return (
      <LineChart
        width={730}
        height={250}
        data={this.state.data}
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
    );
  }
}

export default Landing;
