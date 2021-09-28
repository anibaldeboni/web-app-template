export interface IDemo {
  id: string;
  createdBy: string
  comment: string
  status?: DemoStatus
  createdAt: Date
  updatedAt: Date
}

export enum DemoStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export class Demo {
  id: string;

  createdBy: string;

  comment: string;

  status?: DemoStatus;

  createdAt: Date;

  updatedAt: Date;

  constructor(entity: IDemo) {
    console.log(entity);
    this.id = entity.id;
    this.createdBy = entity.createdBy;
    this.comment = entity.comment;
    this.status = entity.status;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}