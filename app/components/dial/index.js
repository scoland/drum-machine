import React from 'react';
require('./dial.scss');

class Dial extends React.Component {

  constructor(props) {
    super(props);
    this.currentDeg = props.value;
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

      if (deg < 0) {
        deg += 360;
      }

      if(deg < 0){
				deg = 360 + deg;
			} else if (deg > 359) {
				deg = deg % 360;
			}

      this.currentDeg = deg;
      this.props.bpmHandler(deg);
      this.forceUpdate();
    };

    document.addEventListener('mousemove', moveHandler);

    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
    });
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
