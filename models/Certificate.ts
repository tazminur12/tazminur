import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth: string;
  expirationYear: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  image: string;
  date: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    issueMonth: { type: String, default: "" },
    issueYear: { type: String, default: "" },
    expirationMonth: { type: String, default: "" },
    expirationYear: { type: String, default: "" },
    credentialId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    skills: [{ type: String }],
    image: { type: String, default: "" },
    date: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);
