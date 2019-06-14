import React from 'react';
import Grids from './grids';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="headerLogo">Sorting Puzzle</div>
      </div>
      <div className="appShell">
        <LeftPanel />
        <Grids />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
