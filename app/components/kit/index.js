import React from 'react';
import classNames from 'classnames';
require('./kit.scss');

class Kit extends React.Component {
  render() {
    const sounds = ["kick", "snare"];
    const soundButtons = sounds.map( sound => {
      const isActive = this.props.currentSound === sound ? 'active' : '';
      return <a
        className={classNames(sound, isActive)}
        data-sound={sound}
        onClick={this.props.clickHandler}>
          {sound}
        </a>
    });

    return (
      <div className="kit-container">
        {soundButtons}
      </div>
    );
  }
}

export default Kit;
