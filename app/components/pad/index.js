import React from 'react';
import classNames from 'classnames';
require('./pad.scss');

class Pad extends React.Component {
  render() {
    const isOn = this.props.isOn  ? 'hit' : '';
    const isTrig = this.props.isTrig ? 'trig' : '';
    const classes = classNames('pad', isOn, isTrig);
    return (
      <div className={classes} onClick={this.props.clickHandler} data-step={this.props.step}>
      </div>
    );
  }
}

export default Pad;
