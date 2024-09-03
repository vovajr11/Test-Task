import * as mongoose from 'mongoose';

export interface Project extends mongoose.Document {
  readonly owner: string;
  readonly name: string;
  readonly readonlyurl: string;
  readonly stars: number;
  readonly forks: number;
  readonly issues: number;
  readonly createdAt: number;
  readonly userId: mongoose.Types.ObjectId;
}
