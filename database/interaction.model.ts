import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId;
  createdAt: Date;
}
const interactionSchema = new Schema<ITag>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

const interaction = models.Tag || model<ITag>("Tag", interactionSchema);

export default interaction;
