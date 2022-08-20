import { Component } from "react";
import Board from "./Board";
import calculateWinner from "./util";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          points: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      descendingList: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const pointsRef = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          points: pointsRef[i],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)
      ? calculateWinner(current.squares).winner
      : null;

    const moves = history.map((step, move) => {
      if (!this.state.descendingList) move = history.length - 1 - move;
      const desc = move
        ? "Go to move #" + move + " at point " + history[move].points
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {this.state.stepNumber === move ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (winner === null && this.state.stepNumber === 9) {
      status = "It is a draw: No winner";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningLine={
              calculateWinner(current.squares)
                ? calculateWinner(current.squares).winningLine
                : []
            }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <button
            className="toggle-list"
            onClick={() =>
              this.setState({ descendingList: !this.state.descendingList })
            }
          >
            {" "}
            {this.state.descendingList ? "descending" : "ascending"}{" "}
          </button>

          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;