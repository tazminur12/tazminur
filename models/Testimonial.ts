import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  content: string;
  rating: number;
  status: "published" | "draft";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    content: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
