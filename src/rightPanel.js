import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RightPanel extends PureComponent {
  render() {
    return (
      <div className="rightPanel">
        <div className="movesLabel">Your Moves</div>
        <div className="allMoves">
          <div className="moveItem">Tile 1 moved from 2,0 to 2,1</div>
          <div className="moveItem">Tile 1 moved from 2,0 to 2,1</div>
          <div className="moveItem">Tile 1 moved from 2,0 to 2,1</div>
          <div className="moveItem">Tile 1 moved from 2,0 to 2,1</div>
          <div className="moveItem">Tile 1 moved from 2,0 to 2,1</div>
        </div>
      </div>
    );
  }
}

RightPanel.propTypes = {};

export default RightPanel;
