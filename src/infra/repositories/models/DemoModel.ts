import { IDemo, DemoStatus } from '@domain/Demo';
import { IModel } from '@domain/repositories';
import { Model, model, Schema } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class DemoModel implements IModel<IDemo> {
  public readonly schema = new Schema<IDemo>(
    {
      id: String,
      createdBy: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(DemoStatus),
        required: true,
      },
      comment: String,
    },
    {
      timestamps: true,
      toObject: {
        virtuals: true,
        transform: function (doc, ret) {
          ret.id = ret._id.toString();
          delete ret.__v;
          delete ret._id;
          return ret;
        },
      },
    },
  );

  public readonly model: Model<IDemo>;

  constructor() {
    this.model = model<IDemo>('demo', this.schema);
  }
}