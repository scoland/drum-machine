import React from 'react';
import classNames from 'classnames';
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
      </div>
    );
  }
}

export default Transport;
