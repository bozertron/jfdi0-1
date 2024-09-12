import { Schema, model, Document } from 'mongoose';

// Company-wide information
interface ICompanyData extends Document {
  name: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyDataSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Shared workflows
interface ISharedWorkflow extends Document {
  name: string;
  description: string;
  steps: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SharedWorkflowSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  steps: [{ type: String }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const CompanyData = model<ICompanyData>('CompanyData', CompanyDataSchema);
export const SharedWorkflow = model<ISharedWorkflow>('SharedWorkflow', SharedWorkflowSchema);