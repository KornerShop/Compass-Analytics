import React, {Component} from 'react';

export default class CustomToolTip extends Component{
  constructor(props){
    super(props);
    this.getIntroOfPage = this.getIntroOfPage.bind(this);
  }
  getIntroOfPage(label) {
    console.log(`label: ${label}`);
    if (label._id === "English"){
      return "English"
    }
    return "Spanish"
  }

  render() {
    const { active } = this.props;
    if (active){
      const { payload, label } = this.props;
      return(
        <div className="custom-tooltip">
          <p className="label">{payload}</p>
          <p className="intro">{this.getIntroOfPage(label)}</p>
        </div>
      );
    };
    return null;
  }
}
