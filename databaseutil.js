import { MongoClient } from 'mongodb';

export class DB {
  client;
  db;
  collection;

  constructor() {
    this.client = new MongoClient("mongodb+srv://user:eEr2JuznlqXxF4zh@cluster0.0bqqke9.mongodb.net/?retryWrites=true&w=majority");
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
