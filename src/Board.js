import { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        winSquare={this.props.winningLine.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const row = [];
    let key = 0;
    for (let i = 0; i < 3; i++) {
      const col = [];
      for (let j = 0; j < 3; j++) {
        col.push(this.renderSquare(i * 3 + j));
      }
      key++;
      row.push(
        <div key={key} className="board-row">
          {col}
        </div>
      );
    }
    return <div>{row}</div>;
  }
}

export default Board;