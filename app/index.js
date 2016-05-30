import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import Pad from './components/pad';
import Tone from 'tone';
import Transport from './components/transport';
import Kit from './components/kit';
require('../node_modules/font-awesome/scss/font-awesome.scss');
require('./app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: {
        kick: Array(16).fill(false),
        snare: Array(16).fill(false)
      },
      currentNote: null,
      currentSound: 'kick'
    }
    this.sequence = null;
  }

  componentDidMount() {
    const kit = new Tone.PolySynth(1, Tone.Sampler, {
			"kick": "/app/sounds/kick.wav",
      "snare": "/app/sounds/snare.wav"
		}, {
			"volume" : -10,
		}).toMaster();

    this.sequence = new Tone.Sequence((time, note) => {
      this.setState({
        currentNote: note
      });

      for (let key in this.state.matrix) {
        if (this.state.matrix[key][note]) {
          kit.triggerAttackRelease(key, "4n", time);
        }
      }

    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    Tone.Buffer.on('load', () => {
      Tone.Transport.start();
    });
  }

  trigToggle(event) {
    // Make this a little more readable
    const step = event.target.dataset.step;
    const newMatrix = {[this.state.currentSound]: []};
    newMatrix[this.state.currentSound] = this.state.matrix[this.state.currentSound];
    newMatrix[this.state.currentSound][step] = !newMatrix[this.state.currentSound][step];
    const newMatrixState = _.assign(newMatrix, this.state.matrix);
    this.setState({
      matrix: newMatrixState
    });
  }

  selectSound(event) {
    const sound = event.target.dataset.sound;
    if (sound !== this.state.currentSound) {
      this.setState({
        currentSound: sound
      });
    }
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
                  isTrig={this.state.matrix[this.state.currentSound][i]}
                  key={i}
                  clickHandler={this.trigToggle.bind(this)}
                />)
    }

    const isPlaying = this.state.currentNote === null ? false : true;

    return (
      <div className="machine-contain">
        <Transport isPlaying={isPlaying} clickHandler={this.playToggle.bind(this)}/>
        <Kit currentSound={this.state.currentSound} clickHandler={this.selectSound.bind(this)}/>
        <div className="pad-container">
          {pads}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
