import React, { Component } from 'react';

import { PieChart, Pie, Legend, Tooltip } from 'recharts';

class LanguageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langData: null,
    };
    this.updateLang = this.updateLang.bind(this);
  }
  componentDidMount() {
    this.updateLang();
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
          ? <PieChart width={600} height={500}>
              <Pie
                data={this.state.langData}
                dataKey="value"
                nameKey="_id"
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
            </PieChart>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default LanguageChart;
