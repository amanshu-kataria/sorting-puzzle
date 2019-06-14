import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function RightPanel({ history }) {
  return (
    <div className="rightPanel">
      <div className="movesLabel">Your Moves</div>
      <div className="allMoves">
        {history.map((item, i) => {
          return (
            <div className="moveItem" key={i}>
              Tile {item.tile} moved from {item.fromRow + 1},{item.fromCol + 1}{' '}
              to {item.toRow + 1},{item.toCol + 1}.
            </div>
          );
        })}
      </div>
    </div>
  );
}

RightPanel.propTypes = {
  history: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    history: state.store.history
  };
};

export default connect(mapStateToProps)(RightPanel);
