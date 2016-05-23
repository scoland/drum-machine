import React from 'react';
import classNames from 'classnames';
require('./kit.scss');

class Kit extends React.Component {
  render() {
    return (
      <div className="kit-container">
        <a className="kick active" data-sound="kick" onClick={this.props.clickHandler}>Kick</a>
        <a className="snare" data-sound="snare" onClick={this.props.clickHandler}>Snare</a>
      </div>
    );
  }
}

export default Kit;
