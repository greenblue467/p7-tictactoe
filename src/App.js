import React, { Component } from "react";
import app from "./styles/app.css";

class App extends Component {
  state = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: 1,
    winner: "No one ! It's A Tie",
    annouce: false,
    num: 0
  };
  add = e => {
    const newBoard = [...this.state.board];
    if (newBoard[e] === "") {
      if (this.state.currentPlayer === 1) {
        newBoard[e] = "o";
        this.setState({
          currentPlayer: 2,
          board: newBoard,
          winner: "Player 1",
          num: this.state.num + 1
        });
      } else if (this.state.currentPlayer === 2) {
        newBoard[e] = "x";
        this.setState({
          currentPlayer: 1,
          board: newBoard,
          winner: "Player 2",
          num: this.state.num + 1
        });
      }
      this.win(this.state.winner);
    }
    if (this.state.num === 8) {
      this.setState({ winner: "No one ! It's A Tie", annouce: true, num: 8 });
    }
    /* if (this.state.num < 8) {
      this.win(this.state.winner);
    } else {
      this.setState({ winner: "No one ! It's A Tie", annouce: true, num: 8 });
    }*/
  };
  win = e => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let index = 0; index < line.length; index++) {
      const a = line[index][0];
      const b = line[index][1];
      const c = line[index][2];
      if (this.state.board[a] !== "") {
        if (
          this.state.board[a] === this.state.board[b] &&
          this.state.board[a] === this.state.board[c]
        ) {
          const frozeBoard = [...this.state.board];
          this.setState({
            board: frozeBoard,
            annouce: true,
            winner: e,
            num: 0
          });
        }
      }
    }
  };
  restart = () => {
    const newBoard = ["", "", "", "", "", "", "", "", ""];
    this.setState({
      currentPlayer: 1,
      board: newBoard,
      annouce: false,
      winner: "No one ! It's A Tie",
      num: 0
    });
  };
  render() {
    const up = {
      display: this.state.annouce && "block"
    };
    return (
      <div className="game">
        <h2>井字遊戲</h2>
        <div className="text">
          <p>Player 1 : o</p>
          <p>Player 2 : x</p>
          <p className="annouce" style={up}>
            The Winner Is {this.state.winner} !
          </p>
        </div>
        <div className="box">
          {this.state.board.map((x, index) => (
            <div key={Math.random()} onClick={() => this.add(index)}>
              {x}
            </div>
          ))}
        </div>
        <div className="btn" onClick={this.restart}>
          重新開始
        </div>
      </div>
    );
  }
}

export default App;
