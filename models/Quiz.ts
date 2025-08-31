import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  questions: string[];
  creatorEmail: string;
}

const QuizSchema = new Schema<IQuiz>(
  {
    questions: {
      type: [String],
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);
