import React, { Component } from 'react';
import SocketClient from 'socket.io-client';

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
  constructor(props) {
    super(props)
    this.state = {
      langData: null
    };
    this.updateLang = this.updateLang.bind(this);
  }
  componentDidMount() {
    this.updateLang();
  }
  componentWillUnmount() {
    console.log('languageChart unmounted');
    // this.props.disconnect();
  }
  updateLang() {
    this.props.socket.on('populate-language-data', langData => {
      this.setState({ langData });
    });
  }
  render() {
    return (
      <div>
        {this.state.langData
          ? <BarChart
            width={600}
            height={300}
            data={this.state.langData}
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

export default LanguageChart;
