import { MongoClient } from 'mongodb';

export class DB {
  client;
  db;
  collection;

  constructor() {
    const { DB_USER, DB_PASS, DB_HOST } = process.env;
    this.client = new MongoClient(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`);
    this.db = this.client.db('escaperocamvp');
    this.collection = this.db.collection('highscores');
  }

  async insert(highscore) {
    await this.collection.insertOne({
      nick: highscore.nick,
      moves: highscore.moves,
      time: highscore.time,
      createdAt: highscore.createdAt
    });
    return "ok";
  }

  async list() {
    const cursor = this.collection.find({}, {projection: { _id: 0 }}).sort({ moves: 1, time: 1, createdAt: -1 }).limit(5);
    return await cursor.toArray();
  }
}
