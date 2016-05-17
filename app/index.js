import React from 'react';
import ReactDOM from 'react-dom';
import Pad from './components/pad/pad';
require('./app.scss');

class App extends React.Component {
  render() {
    const pads = [];
    for (var i = 0; i < 16; i++) {
      pads.push(<Pad step={i}/>)
    }

    return (
      <div className="pad-container">
        {pads}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
