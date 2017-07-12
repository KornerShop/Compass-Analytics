import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: tomato;
  font-size: 80px;
  text-align: center;
  margin: 250px;
`;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
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
      <LineChart width={600} height={300} data={this.state.data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    );
  }
}

export default Landing;
