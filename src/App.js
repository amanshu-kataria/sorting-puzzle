import React, { PureComponent } from 'react';
import Grids from './grids';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';

class App extends PureComponent {
  state = {
    shuffle: 0
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="headerLogo">Sorting Puzzle</div>
        </div>
        <div className="appShell">
          <LeftPanel />
          <Grids gridSize={4} shuffle={this.state.shuffle} />
          <RightPanel />
        </div>
      </div>
    );
  }
}

export default App;
