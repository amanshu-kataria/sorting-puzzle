const grid = JSON.parse(localStorage.getItem('grid'));
const history = JSON.parse(localStorage.getItem('history'));
const level = JSON.parse(localStorage.getItem('level'));
const status = Number(JSON.parse(localStorage.getItem('status')));

const gridSize = grid && grid instanceof Array ? Math.sqrt(grid.length) : 4;

let initalState = {
  gridSize,
  grid: grid && grid instanceof Array ? grid : [],
  history: history && history instanceof Array ? history : [],
  totalMoves: history && history instanceof Array ? history.length : 0,
  level: level || 'Amateur',
  status: Number.isNaN(status) ? 0 : status
};

//function to check if level and grid size matches
function checkLevelAndGrid(gridSize = 0, level) {
  const size = Math.sqrt(gridSize);
  const levels = {
    4: 'Amateur',
    5: 'Semi-Pro',
    6: 'Professional',
    8: 'Legendary'
  };
  return levels[size] === level;
}

if (!level || !checkLevelAndGrid(initalState.grid.length, level)) {
  localStorage.setItem('timer', JSON.stringify(0));
  localStorage.setItem('level', JSON.stringify('Amateur'));
  initalState = {
    gridSize: 4,
    grid: [],
    history: [],
    totalMoves: -1,
    level: 'Amateur',
    status: 0 // 0->In process, 1->Puzzle solved
  };
}

export default (state = initalState, action) => {
  switch (action.type) {
    case 'ON_TILE_MOVE':
      localStorage.setItem('grid', JSON.stringify(action.grid));
      return {
        ...state,
        grid: [...action.grid]
      };

    case 'UPDATE_HISTORY':
      const history = [...state.history, action.move];
      localStorage.setItem('history', JSON.stringify(history));

      return {
        ...state,
        history,
        totalMoves: state.totalMoves + 1
      };

    case 'ON_NEW_GAME':
      localStorage.setItem('history', JSON.stringify([]));
      localStorage.setItem('timer', JSON.stringify(0));
      localStorage.setItem('status', JSON.stringify(0));
      return {
        ...state,
        grid: [],
        history: [],
        totalMoves: -1,
        status: 0
      };

    case 'ON_LEVEL_CHANGE':
      return {
        ...state,
        gridSize: action.gridSize,
        level: action.level,
        history: [],
        totalMoves: -1
      };

    case 'SET_MOVES':
      return {
        ...state,
        totalMoves: 0
      };

    case 'ON_SOLVED':
      return {
        ...state,
        status: 1
      };

    default:
      return state;
  }
};
