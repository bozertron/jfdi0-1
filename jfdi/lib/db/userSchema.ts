import { Schema, model, Document } from 'mongoose';

// User-specific data
interface IUserData extends Document {
  userId: string;
  name: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

const UserDataSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Personal workflows
interface IPersonalWorkflow extends Document {
  userId: string;
  name: string;
  description: string;
  steps: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PersonalWorkflowSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  steps: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Tags
interface ITag extends Document {
  userId: string;
  llm: string;
  project: string;
  task: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema({
  userId: { type: String, required: true },
  llm: { type: String, required: true },
  project: { type: String, required: true },
  task: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const UserData = model<IUserData>('UserData', UserDataSchema);
export const PersonalWorkflow = model<IPersonalWorkflow>('PersonalWorkflow', PersonalWorkflowSchema);
export const Tag = model<ITag>('Tag', TagSchema);