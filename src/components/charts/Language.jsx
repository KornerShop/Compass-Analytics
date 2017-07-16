import React, { Component } from 'react';
import SocketClient from 'socket.io-client';

import CustomToolTip from './CustomToolTip'

import {
  PieChart,
  Pie,
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
    // console.log('languageChart unmounted');
  }
  updateLang() {
    this.props.socket.on('populate-language-data', langData => {
      this.setState({ langData });
    });
  }
  /*[
  { _id: 'English', count: 375 },
  { _id: 'Spanish', count: 325 }
]*/

  render() {
    return (
      <div>
        {this.state.langData
          ? <PieChart width={800} height={600}>
              <Pie data={this.state.langData} valueKey='value' nameKey="_id" cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default LanguageChart;
