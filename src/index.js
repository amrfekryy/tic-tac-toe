import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = props => {
  const {onClick, value} = props
  return <button className="square" onClick={onClick}>{value}</button>
}

class Board extends React.Component {
  renderSquare(i) {
    const { squares, handleClick } = this.props
    return <Square 
      value={squares[i]}
      onClick={() => handleClick(i)}
    />;
  }
  render() {
    return (
      <div>
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
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        turn: 'X',
        winner: null
      }],
      displayMove: 0
    }
  }

  checkWinner = (squares) => {
    let winner = null
    const cases = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    cases.forEach(d => {
      const [a, b, c] = d
      if (squares[a] === squares[b] && squares[b] === squares[c]) winner = squares[a]
    })
    return winner
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.displayMove + 1)
    const currentMove = history.slice(-1)[0]
    const {squares, winner, turn} = currentMove
    if (squares[i] || winner) return

    const Squares = squares.slice()
    Squares[i] = turn

    this.setState({
      history: history.concat([{
        squares: Squares, 
        turn: {'X':'O', 'O':'X'}[turn],
        winner: this.checkWinner(Squares)
      }]),
      displayMove: history.length
    })
  }

  jumpTo = (move) => {
    this.setState({displayMove: move})
  }

  render() {
    const history = this.state.history
    const currentMove = history[this.state.displayMove]
    const { squares, winner, turn } = currentMove
    const status = winner ? `Winner is ${winner}` : `Next player: ${turn}`
    // console.log(history)
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={squares}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{history.map((d, move) => {
            return <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{move ? `Move ${move}` : 'Start'}</button>
            </li>})}
          </ol>
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
