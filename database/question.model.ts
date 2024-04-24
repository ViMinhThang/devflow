import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date; // Corrected field name
}

const QuestionSchema = new Schema({
  title: { type: String, required: true }, // Corrected "require" to "required"
  content: { type: String, required: true }, // Corrected "require" to "required"
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 }, // Corrected "tpe" to "type"
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now }, // Corrected field name
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
