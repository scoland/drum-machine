import React from 'react';
require('./dial.scss');

class Dial extends React.Component {

  constructor(props) {
    super(props);
    this.currentDeg = this.degreesHelper(props.value + 180);
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
      const a = center.y - e.pageY;
			const b = center.x - e.pageX;
			let deg = Math.floor((Math.atan2(a,b)*rad2deg) - 90);

      deg = this.degreesHelper(deg);

      let bpm = deg + 180;

      bpm = this.degreesHelper(bpm);

      this.currentDeg = deg;
      this.props.bpmHandler(bpm);
      this.forceUpdate();
    };

    document.addEventListener('mousemove', moveHandler);

    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
    });
  }

  // This function makes sure the number is between 0-360
  degreesHelper(num) {
    if(num < 0){
      num = 360 + num;
    } else if (num > 359) {
      num = num % 360;
    }
    return num;
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
  max: React.PropTypes.number
};

export default Dial;
