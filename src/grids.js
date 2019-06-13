import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class Grids extends PureComponent {
  state = {
    grid: []
  };
  componentDidMount() {
    this.shuffle();
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

    let count = 0;

    let randomGrid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      let row = new Array(gridSize);
      for (let j = 0; j < gridSize; j++) {
        row[j] = grid[count++];
      }
      randomGrid[i] = [...row];
    }

    this.setState({ grid: randomGrid });
  }

  getGridClass = value => {
    return value ? 'gridItem' : 'gridItem mover';
  };

  onDragStart = (e, i, j) => {
    console.log(i, ',', j);
  };

  onGridDrop = e => {
    console.log(e);
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
          {this.state.grid.map((row, i) => {
            return (
              <Fragment key={`row${i}`}>
                {row.map((column, j) => {
                  return (
                    <div
                      className={this.getGridClass(column)}
                      key={`${i}${j}`}
                      draggable={true}
                      onDragStart={e => this.onDragStart(e, i, j)}
                      onDrop={this.onGridDrop}
                    >
                      {column}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

Grids.propTypes = {
  gridSize: PropTypes.number.isRequired
};

export default Grids;
