import React from 'react';
import classNames from 'classnames';
import Dial from '../dial';
require('./transport.scss');

class Transport extends React.Component {
  render() {
    const playOrPause = this.props.isPlaying ? 'fa-pause' : 'fa-play';
    const buttonClasses = classNames('fa', playOrPause);
    return (
      <div className="transport-contain">
        <a className="play-toggle" onClick={this.props.clickHandler}>
          <i className={buttonClasses} aria-hidden="true"></i>
        </a>
        <div className="bpm-display">
          <span>{this.props.currentBPM}</span>
        </div>
        <Dial min={20} max={220} value={120} turnHandler={this.props.bpmHandler}/>
      </div>
    );
  }
}

export default Transport;
