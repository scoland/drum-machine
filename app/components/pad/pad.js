import React from 'react';
import ReactDOM from 'react-dom';
require('./pad.scss');

class Pad extends React.Component {
  render() {
    return (
      <div className="pad">
        {this.props.step}
      </div>
    );
  }
}

export default Pad;
