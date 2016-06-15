import React from 'react';
require('./dial.scss');

class Dial extends React.Component {

  constructor(props) {
    super(props);
    this.currentDeg = this.convertRange(this.props.min, this.props.max, 0, 360, this.props.value);
    this.startDrag = this.startDrag.bind(this);
  }

  startDrag(e) {
    e.preventDefault();

    const dial = e.target;
    const dialRect = dial.getBoundingClientRect();
    const center = {
      x: dialRect.left + dialRect.width / 2,
      y: dialRect.top + dialRect.height / 2
    };

    const rad2deg = 180/Math.PI;

    const moveHandler = e => {
      const offsetX = e.pageX - center.x;
      const offsetY = center.y - e.pageY;
			let cssDeg = this.arcTanHelper(offsetX, offsetY);

      let newValue = Math.floor(this.convertRange(0, 360, this.props.min, this.props.max, cssDeg));

      this.currentDeg = cssDeg;
      this.props.turnHandler(newValue);
      this.forceUpdate();
    };

    document.addEventListener('mousemove', moveHandler);

    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
    });
  }

  convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
    return (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
  }

  // This function takes an X and a Y value and returns the correct css offset in degrees from
  // the bottom of the knob depending on the quadrant
  arcTanHelper(x, y) {
  	const absX = Math.abs(x);
  	const absY = Math.abs(y);
    const rad2deg = 180 / Math.PI;

    // Quadrant 1
    if (x >= 0 && y >= 0) {
    	return 180 + rad2deg * Math.atan2(absX, absY);
    }
    // Quadrant 2
    if (x < 0 && y >= 0) {
      return 90 + rad2deg * Math.atan2(absY, absX);
    }
    // Quadrant 3
    if (x < 0 && y < 0) {
      return rad2deg * Math.atan2(absX, absY);
    }
    // Quadrant 4
    if (x >= 0 && y < 0) {
      return 270 + rad2deg * Math.atan2(absY, absX);
    }
  }

  render() {
    let style = { transform: `rotate(${this.currentDeg}deg)` }
    return (
      <div className="dial" style={style} onMouseDown={this.startDrag}>
      </div>
    );
  }
}

Dial.propTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  turnHandler: React.PropTypes.func
};

export default Dial;
