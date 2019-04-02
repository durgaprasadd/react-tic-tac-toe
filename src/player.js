class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.moves = [];
  }
  addMove(move) {
    this.moves.push(move);
  }
  isWon(winningChances) {
    return winningChances.some(set => set.every(x => this.moves.includes(x)));
  }
  getTurn() {
    return `${this.name}'s turn`;
  }
  getWonMessage() {
    return `${this.name} won`
  }
  getSymbol() {
    return this.symbol;
  }
}

export default Player;