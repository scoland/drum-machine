import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
require('./pad.scss');

class Pad extends React.Component {
  render() {
    const isOn = this.props.isOn  ? 'hit' : '';
    const classes = classNames('pad', isOn);
    return (
      <div className={classes} onClick={this.props.clickHandler} data-step={this.props.step}>
        {this.props.step}
      </div>
    );
  }
}

export default Pad;
