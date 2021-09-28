import { Model, Schema } from 'mongoose';

export interface IModel<T> {
  schema: Schema;
  model: Model<T>;
}