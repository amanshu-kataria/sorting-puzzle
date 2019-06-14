export function shuffle() {
  return (dispatch, getState) => {
    const { gridSize, status } = getState().store;
    if (!status) {
      let grid = [...getState().store.grid];

      if (!grid.length) {
        for (let i = 1; i < gridSize * gridSize; i++) {
          grid.push(i);
        }
        grid.push(null);
      }

      const maxValue = gridSize * gridSize;

      for (let i = 0; i < gridSize * gridSize; i++) {
        let a = Math.floor(Math.random() * (maxValue - 0) + 0);
        let b = Math.floor(Math.random() * (maxValue - 0) + 0);
        let temp = grid[a];
        grid[a] = grid[b];
        grid[b] = temp;
      }

      localStorage.setItem('grid', JSON.stringify(grid));

      dispatch({
        type: 'ON_TILE_MOVE',
        grid
      });
    }
  };
}

export function newGame() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ON_NEW_GAME'
    });
    dispatch(shuffle());
  };
}
