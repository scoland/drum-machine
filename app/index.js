import React from 'react';
import ReactDOM from 'react-dom';
import Pad from './components/pad/pad';
import Tone from 'tone';
require('./app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: Array(16).fill(false),
      currentNote: null
    }
  }

  componentDidMount() {
    const kit = new Tone.PolySynth(1, Tone.Sampler, {
			"kick" : "/app/sounds/kick.mp3",
		}, {
			"volume" : -10,
		}).toMaster();

    const seq = new Tone.Sequence((time, note) => {
      this.setState({
        currentNote: note
      });

      if (this.state.matrix[note]) {
        kit.triggerAttackRelease("kick", "4n", time);
      }

    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

    Tone.Buffer.on('load', () => {
      Tone.Transport.start();
      seq.start();
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
      <div className="pad-container">
        {pads}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
