import React from 'react';
require('./dial.scss');

class Dial extends React.Component {

  render() {
    let style = { transform: `rotate(${this.props.value}deg)` }
    return (
      <div className="dial" style={style}>
      </div>
    );
  }
}

Dial.propTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number
};

export default Dial;
