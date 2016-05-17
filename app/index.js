import React from 'react';
import ReactDOM from 'react-dom';
import Pad from './components/pad/pad';
import Tone from 'tone';
require('./app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      currentNote: null
    }
  }

  componentDidMount() {
    console.log(this.state.matrix);
    const seq = new Tone.Sequence((time, note) => {
      this.setState({
        currentNote: note
      })
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");
      Tone.Transport.start();
      seq.start();
    }

  render() {
    const pads = [];
    for (var i = 0; i < 16; i++) {
      pads.push(<Pad step={i} isOn={this.state.currentNote === i}/>)
    }

    return (
      <div className="pad-container">
        {pads}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
