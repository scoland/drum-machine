import React from 'react';
require('./dial.scss');

class Dial extends React.Component {

  constructor(props) {
    super(props);
    this.startDeg = -1;
    this.rotation = props.value;
    this.currentDeg = props.value;
    this.lastDeg = 0;

    this.startDrag = this.startDrag.bind(this);
  }

  startDrag(e) {
    e.preventDefault();

    console.log('drag started');

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
			let deg = Math.atan2(a,b)*rad2deg;

      if (deg < 0) {
        deg += 360;
      }

      if (this.startDeg === -1) {
        this.startDeg = deg;
      }

      let tmp = Math.floor((deg - this.startDeg) + this.rotation);

      if(tmp < 0){
				tmp = 360 + tmp;
			}
			else if(tmp > 359){
				tmp = tmp % 360;
			}

      this.currentDeg = tmp;
      this.lastDeg = tmp;
      this.forceUpdate();
    };

    document.addEventListener('mousemove', moveHandler);

    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
      console.log('removed');
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
