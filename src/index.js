import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = props => {
  const {onClick, value} = props
  return <button className="square" onClick={onClick}>
      {value}
    </button>
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: 'X',
      winner: null
    }
  }

  checkWinner = (squares) => {
    let winner = null
    const cases = [ [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [2,4,6] ]
    cases.forEach(d => {
      const [a, b, c] = d
      if (squares[a] === squares[b] && squares[b] === squares[c]) {
        winner = squares[a]
      }
    })
    return winner
  }

  handleClick = (i) => {
    const {squares, winner, turn} = this.state
    if (squares[i] || winner) return

    const Squares = squares.slice()
    Squares[i] = turn

    this.setState({
      squares: Squares, 
      turn: {'X':'O', 'O':'X'}[turn],
      winner: this.checkWinner(Squares)
    })
  }

  renderSquare(i) {
    const { squares, winner } = this.state
    return <Square 
      value={squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const { turn, winner } = this.state
    const status = winner ? `Winner is ${winner}` : `Next player: ${turn}`

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
