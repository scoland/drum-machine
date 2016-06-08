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
      instruments: {
        kick: {
          matrix: Array(16).fill(false),
          velocity: .6
        },
        snare: {
          matrix: Array(16).fill(false),
          velocity: .6
        },
        closedHat: {
          matrix: Array(16).fill(false),
          velocity: .6
        }
      },
      currentNote: null,
      currentSound: 'kick',
      bpm: 120
    }
    this.sequence = null;
  }

  componentDidMount() {
    const kit = new Tone.PolySynth(1, Tone.Sampler, {
			"kick": "/app/sounds/kick.wav",
      "snare": "/app/sounds/snare.wav",
      "closedHat": "/app/sounds/closed-hat.wav"
		}, {
			"volume" : -6,
		}).toMaster();

    this.sequence = new Tone.Sequence((time, note) => {
      this.setState({
        currentNote: note
      });

      for (let instrument in this.state.instruments) {
        console.log(this.state.instruments[instrument]);
        if (this.state.instruments[instrument].matrix[note]) {
          kit.triggerAttackRelease(instrument, "4n", time, .5);
        }
      }

    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    Tone.Buffer.on('load', () => {
      Tone.Transport.start();
    });
  }

  trigToggle(event) {
    const step = event.target.dataset.step;
    const oldMatrix = this.state.instruments[this.state.currentSound].matrix;
    const newMatrix = oldMatrix;
    newMatrix[step] = !newMatrix[step];
    let newInstrument = {
      matrix: newMatrix,
      velocity: this.state.instruments[this.state.currentSound].velocity
    }
    const newInstruments = this.state.instruments;
    this.state.instruments[this.state.currentSound] = newInstrument;
    this.setState({
      instruments: newInstruments
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

  changeBPM(newBPM) {
    Tone.Transport.bpm.value = newBPM;
    this.setState({
      bpm: newBPM
    });
  }

  render() {
    const pads = [];
    for (var i = 0; i < 16; i++) {
      pads.push(<Pad
                  step={i}
                  isOn={this.state.currentNote === i}
                  isTrig={this.state.instruments[this.state.currentSound].matrix[i]}
                  key={i}
                  clickHandler={this.trigToggle.bind(this)}
                />)
    }

    const isPlaying = this.state.currentNote === null ? false : true;

    return (
      <div className="machine-contain">
        <Transport
          isPlaying={isPlaying}
          clickHandler={this.playToggle.bind(this)}
          bpmHandler={this.changeBPM.bind(this)}
          currentBPM={this.state.bpm}
        />

        <Kit
          currentSound={this.state.currentSound}
          clickHandler={this.selectSound.bind(this)}
        />

        <div className="pad-container">
          {pads}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
