import mongoose from "mongoose";
console.log("AIResult Model Loaded");
const aiResultSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      documentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true,
        unique: true,
      },

      summary: {
        type: String,
        default: "",
      },

      detailedNotes: {
        type: String,
        default: "",
      },

      quiz: {
        type: String,
        default: "",
      },

      flashcards: {
        type: String,
        default: "",
      },

      interviewQuestions: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AIResult",
  aiResultSchema
);