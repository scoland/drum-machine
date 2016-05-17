import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
require('./pad.scss');

class Pad extends React.Component {
  render() {
    console.log(this.props);
    const isOn = this.props.isOn ? 'hit' : '';
    const classes = classNames('pad', isOn);
    console.log(classes);
    return (
      <div className={classes}>
        {this.props.step}
      </div>
    );
  }
}

export default Pad;
