import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffle, newGame } from './Actions';

const levels = [
  { name: 'Amateur', gridSize: 4 },
  { name: 'Semi-Pro', gridSize: 5 },
  { name: 'Professional', gridSize: 6 },
  { name: 'Legendary', gridSize: 8 }
];

class Grids extends PureComponent {
  state = {
    draggedItemIndex: -1
  };

  componentDidMount() {
    if (!this.props.grid.length) {
      this.props.dispatch(shuffle());
    }
  }

  shuffle() {
    const { gridSize } = this.props;
    let grid = [];

    for (let i = 1; i < gridSize * gridSize; i++) {
      grid.push(i);
    }
    grid.push(null);
    const maxValue = gridSize * gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
      let a = Math.floor(Math.random() * (maxValue - 0) + 0);
      let b = Math.floor(Math.random() * (maxValue - 0) + 0);
      let temp = grid[a];
      grid[a] = grid[b];
      grid[b] = temp;
    }

    localStorage.setItem('grid', JSON.stringify(grid));

    this.props.dispatch({
      type: 'ON_TILE_MOVE',
      grid
    });
  }

  getGridClass = value => {
    return value ? 'gridItem' : 'gridItem mover';
  };

  getLevelClass = level => {
    return level === this.props.level ? 'levelButon activeLevel' : 'levelButon';
  };

  moveGrid = gridIndex => {
    let grid = [...this.props.grid];
    if (grid[gridIndex] !== null) {
      const { gridSize } = this.props;

      const top = gridIndex - gridSize;
      const bottom = gridIndex + gridSize;
      const left = gridIndex - 1;
      const right = gridIndex + 1;

      let emptyGrid = -1;

      if (top >= 0 && grid[top] === null) {
        emptyGrid = top;
      } else if (bottom < grid.length && grid[bottom] === null) {
        emptyGrid = bottom;
      } else if (
        left % gridSize >= 0 &&
        left % gridSize < gridIndex % gridSize &&
        grid[left] === null
      ) {
        emptyGrid = left;
      } else if (
        right % gridSize < gridSize &&
        right % gridSize > gridIndex % gridSize &&
        grid[right] === null
      ) {
        emptyGrid = right;
      }

      if (emptyGrid === -1) {
        return;
      }

      const temp = grid[gridIndex];
      grid[gridIndex] = grid[emptyGrid];
      grid[emptyGrid] = temp;

      const toCol = emptyGrid % gridSize;
      const toRow = parseInt(emptyGrid / gridSize);

      const fromCol = gridIndex % gridSize;
      const fromRow = parseInt(gridIndex / gridSize);

      //todo: check if solved
      this.props.dispatch({
        type: 'UPDATE_HISTORY',
        move: { toCol, toRow, fromCol, fromRow, tile: temp }
      });

      this.props.dispatch({
        type: 'ON_TILE_MOVE',
        grid
      });
    }
  };

  changeLevel = (gridSize, level) => {
    if (this.props.level !== level) {
      this.props.dispatch({ type: 'ON_LEVEL_CHANGE', gridSize, level });
      this.props.dispatch(newGame());
      localStorage.setItem('level', JSON.stringify(level));
    }
  };

  render() {
    return (
      <div className="centerPanel">
        <div
          className="gridContainer"
          style={{
            gridTemplateColumns: `repeat(${this.props.gridSize}, auto)`
          }}
        >
          {this.props.grid.map((row, i) => {
            return (
              <div
                className={this.getGridClass(row)}
                key={`${row}`}
                onClick={() => this.moveGrid(i)}
              >
                {row}
              </div>
            );
          })}
        </div>
        <div className="levels">
          {levels.map(level => {
            return (
              <div className="levelItem" key={level.name}>
                <div
                  className={this.getLevelClass(level.name)}
                  onClick={() => this.changeLevel(level.gridSize, level.name)}
                >
                  {level.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Grids.propTypes = {
  gridSize: PropTypes.number.isRequired,
  grid: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    grid: state.store.grid,
    gridSize: state.store.gridSize,
    level: state.store.level
  };
};

export default connect(mapStateToProps)(Grids);
