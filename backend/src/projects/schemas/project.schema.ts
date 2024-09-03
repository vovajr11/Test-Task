import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  owner: String,
  name: String,
  url: String,
  stars: Number,
  forks: Number,
  issues: Number,
  createdAt: Number,
  userId: mongoose.Schema.Types.ObjectId,
});
