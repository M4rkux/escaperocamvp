export class Highscore {
  constructor(nick, moves, time) {
    this.nick = nick;
    this.moves = moves;
    this.time = time;
    this.createdAt = new Date();
  }
}
