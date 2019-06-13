import React, { PureComponent } from 'react';

class LeftPanel extends PureComponent {
  render() {
    return (
      <div className="leftPanel">
        <div className="timer">
          <span className="timeLabel">Time</span>:{' '}
          <span className="timeCount">0h: 3m: 4s</span>
        </div>
        <div className="moves">Moves: 3</div>
        <div className="button newGame ">New Game</div>
        <div className="button autoSolve">Auto Solve</div>
        <div className="button shuffleBoard">Shuffle Board</div>
      </div>
    );
  }
}

export default LeftPanel;
