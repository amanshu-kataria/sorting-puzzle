import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { newGame, shuffle } from './Actions';

class LeftPanel extends PureComponent {
  constructor() {
    super();
    this.state = {
      timer: {
        h: 0,
        m: 0,
        s: 0
      }
    };
  }

  componentDidMount() {
    let timer = Number(JSON.parse(localStorage.getItem('timer')));

    if (Number.isNaN(timer)) {
      this.props.dispatch(newGame());
    } else {
      const h = Math.floor(timer / 3600);
      const m = Math.floor((timer % 3600) / 60);
      const s = Math.floor((timer % 3600) % 60);
      this.setState({ timer: { h, m, s } });
    }
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.moves === -1) {
      this.props.dispatch({
        type: 'SET_MOVES'
      });
      localStorage.setItem('timer', JSON.stringify(0));
      this.setState({
        timer: {
          h: 0,
          m: 0,
          s: 0
        }
      });
    }
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      let timer = { ...this.state.timer };
      if (timer.s < 59) {
        timer.s++;
      } else {
        timer.s = 0;
        if (timer.m < 59) {
          timer.m++;
        } else {
          timer.m = 0;
          timer.h++;
        }
      }

      if (timer.s % 2 === 0) {
        let seconds = timer.h * 60 * 60 + timer.m * 60 + timer.s;
        localStorage.setItem('timer', JSON.stringify(seconds));
      }

      this.setState({ timer });
    }, 1000);
  };

  render() {
    const { h, m, s } = this.state.timer;
    return (
      <div className="leftPanel">
        <div className="timer">
          <span className="timeLabel">Time</span>:{' '}
          <span className="timeCount">
            {h}h: {m}m: {s}s
          </span>
        </div>
        <div className="moves">Moves: {this.props.moves}</div>
        <div
          className="button newGame"
          onClick={() => this.props.dispatch(newGame())}
        >
          New Game
        </div>
        <div className="button autoSolve">Auto Solve</div>
        <div
          className="button shuffleBoard"
          onClick={() => this.props.dispatch(shuffle())}
        >
          Shuffle Board
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moves: state.store.totalMoves
  };
};

export default connect(mapStateToProps)(LeftPanel);
