import React from 'react';
import ReactDOM from 'react-dom';
import Pad from './components/pad';
import Tone from 'tone';
import Transport from './components/transport';
require('../node_modules/font-awesome/scss/font-awesome.scss');
require('./app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: Array(16).fill(false),
      currentNote: null
    }
    this.sequence = null;
  }

  componentDidMount() {
    const kit = new Tone.PolySynth(1, Tone.Sampler, {
			"kick" : "/app/sounds/kick.mp3",
		}, {
			"volume" : -10,
		}).toMaster();

    this.sequence = new Tone.Sequence((time, note) => {
      this.setState({
        currentNote: note
      });

      if (this.state.matrix[note]) {
        kit.triggerAttackRelease("kick", "4n", time);
      }

    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    Tone.Buffer.on('load', () => {
      Tone.Transport.start();
    });
  }

  trigToggle(event) {
    const step = event.target.dataset.step;
    const newMatrix = this.state.matrix;
    newMatrix[step] = !newMatrix[step];
    this.setState({
      matrix: newMatrix
    });
  }

  playToggle() {
    if (this.sequence.state === 'started') {
      this.sequence.stop();
      this.setState({
        currentNote: null
      });
    } else {
      this.sequence.start();
    }
  }

  render() {
    const pads = [];
    for (var i = 0; i < 16; i++) {
      pads.push(<Pad
                  step={i}
                  isOn={this.state.currentNote === i}
                  isTrig={this.state.matrix[i]}
                  key={i}
                  clickHandler={this.trigToggle.bind(this)}
                />)
    }

    return (
      <div className="machine-contain">
        <Transport clickHandler={this.playToggle.bind(this)}/>
        <div className="pad-container">
          {pads}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
