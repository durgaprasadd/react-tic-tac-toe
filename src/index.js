import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Player from './player.js'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.players = props.players;
    this.state = { grids: [['', '', ''], ['', '', ''], ['', '', '']], turn: this.getCurrentPlayerTurn() };
    this.hasWon = false;
    this.winningMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  }

  getCurrentPlayer() {
    return this.players[0]
  }

  getCurrentPlayerTurn() {
    return this.players[0].getTurn();
  }

  addSymbolToBoard(grids, id) {
    const rowIndex = Math.floor(id / 3);
    const cellIndex = id - (rowIndex * 3);
    grids[rowIndex][cellIndex] = this.getCurrentPlayer().getSymbol();
  }

  getSymbolInBoard(grids, id) {
    const rowIndex = Math.floor(id / 3);
    const cellIndex = id - (rowIndex * 3);
    return grids[rowIndex][cellIndex]
  }

  update(event) {
    const id = +event.target.id;
    this.setState(state => {
      const { grids } = state;
      const currentPlayer = this.getCurrentPlayer();
      if (!this.getSymbolInBoard(grids, id)) {
        currentPlayer.addMove(id);
        this.addSymbolToBoard(grids, id)
        this.players.reverse();
      }
      this.hasWon = currentPlayer.isWon(this.winningMoves);
      const turn = this.getCurrentPlayerTurn();
      return { grids, turn }
    });
  }

  createCell(row, rowIndex) {
    return row.map((cell, cellIndex) => <td id={rowIndex * 3 + cellIndex} >{cell}</td>);
  }

  createRow(grids) {
    const table = grids.map((row, rowIndex) => <tr>{this.createCell(row, rowIndex)}</tr>);
    return table;
  }

  printBoard() {
    let onclick = this.update.bind(this);
    let message = <h1>{this.state.turn}</h1>
    if (this.hasWon) {
      onclick = null;
      message = <h1>{this.players[1].getWonMessage()}</h1>
    }
    return <div>{message}<table onClick={onclick}><tbody>{this.createRow(this.state.grids)}</tbody></table></div>;
  }

  render() {
    return this.printBoard();
  }
}
const player1 = new Player("Prasanth", "X");
const player2 = new Player("Leela", "O");
const players = [player1, player2];
ReactDOM.render(<Game players={players} />, document.getElementById("root"));