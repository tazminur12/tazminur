import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status: "published" | "draft";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, default: "Full Stack" },
    tags: [{ type: String }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
