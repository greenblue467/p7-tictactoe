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
    let n;
    if (newBoard[e] === "") {
      if (this.state.currentPlayer === 1) {
        newBoard[e] = "o";
        n = this.state.num + 1;
        this.setState({
          currentPlayer: 2,
          board: newBoard,
          winner: "Player 2",
          num: n
        });
      } else if (this.state.currentPlayer === 2) {
        newBoard[e] = "x";
        n = this.state.num + 1;
        this.setState({
          currentPlayer: 1,
          board: newBoard,
          winner: "Player 1",
          num: n
        });
      }
    }
    if (n === 9) {
      this.win(newBoard);
      this.setState({
        winner: "No one ! It's A Tie",
        annouce: true,
        num: 9
      });
    }
    this.win(newBoard);
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
      if (e[a] !== "") {
        if (e[a] === e[b] && e[a] === e[c]) {
          this.setState({
            board: e,
            annouce: true,
            winner: this.state.winner,
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
          <p className="shield" style={up}></p>
        </div>
        <div className="btn" onClick={this.restart}>
          重新開始
        </div>
      </div>
    );
  }
}

export default App;
