import mongoose from "mongoose";

const noteSchema =
new mongoose.Schema(
  {
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

     flashcards: {
    type: String,
    default: "",
    },

    interviewQuestions: {
     type: String,
    default: "",
    },

    quiz: {
     type: String,
    default: "",
    },

    detailedNotes: {
     type: String,
    default: "",
    },

    documentId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model( "Note", noteSchema);

export default Note;