import React from 'react';
require('./transport.scss');

class Transport extends React.Component {
  render() {
    return (
      <div className="transport-contain">
        <a className="play-toggle" onClick={this.props.clickHandler}>Play/Pause</a>
      </div>
    );
  }
}

export default Transport;
