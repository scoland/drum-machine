import React from 'react';
import classNames from 'classnames';
require('./kit.scss');

class Kit extends React.Component {
  render() {
    const sounds = ["kick", "snare", "closedHat"];
    const soundButtons = sounds.map( (sound, index) => {
      const isActive = this.props.currentSound === sound ? 'active' : '';
      return <a
              className={classNames(sound, isActive)}
              data-sound={sound}
              onClick={this.props.clickHandler}
              key={index}>
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
