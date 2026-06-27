import Document from "../models/document.model.js";
import mongoose from "mongoose";



import { generateSummary,generateDetailedNotes,generateQuiz,generateInterviewQuestions,generateFlashcards } from "../services/groq.service.js";

import AIResult from "../models/aiResult.model.js";



export const createSummary =
async (req, res) => {

  try {

    const { documentId } = req.body;

    const document =
      await Document.findById(
        documentId
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message:
          "Document not found",
      });
    }

    const summary =
      await generateSummary(
        document.extractedText
      );

    const note =
      await AIResult.findOneAndUpdate(
        {
          userId: req.user.id,
          documentId,
        },
        {
          summary,
        },
        {
          new: true,
          upsert: true,
        }
      );
      

    res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// new function to create detailed notes

export const createDetailedNotes =
async (req, res) => {

  try {

    const { documentId } = req.body;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const notes =
      await generateDetailedNotes(
        document.extractedText.slice(0,10000)
      );

    const savedNote =
      await AIResult.findOneAndUpdate(
        {
          userId: req.user.id,
          documentId,
        },
        {
          detailedNotes: notes,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json({
      success: true,
      savedNote,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//new function to create quiz

export const createQuiz =
async (req, res) => {

  try {

    const { documentId } = req.body;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const quiz =
      await generateQuiz(
        document.extractedText.slice(0,10000)
      );

    const savedQuiz =
      await AIResult.findOneAndUpdate(
        {
          userId: req.user.id,
          documentId,
        },
        {
          quiz,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json({
      success: true,
      savedQuiz,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//new function to create interview questions

export const createInterviewQuestions =
async (req, res) => {

  try {

    const { documentId } = req.body;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const interviewQuestions =
      await generateInterviewQuestions(
        document.extractedText.slice(0,10000)
      );

    const savedData =
      await AIResult.findOneAndUpdate(
        {
          userId: req.user.id,
          documentId,
        },
        {
          interviewQuestions,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json({
      success: true,
      savedData,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//new function to create flashcards

export const createFlashcards =
async (req, res) => {

  try {

    const { documentId } = req.body;

    const document =
      await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const flashcards =
      await generateFlashcards(
        document.extractedText.slice(0,10000)
      );

    const savedFlashcards =
      await AIResult.findOneAndUpdate(
        {
          userId: req.user.id,
          documentId,
        },
        {
          flashcards,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json({
      success: true,
      savedFlashcards,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//new function to get AI results


export const getAIResults =
async (req, res) => {


  try {

    const { documentId } =
      req.params;

    const result = await AIResult.findOne({
    documentId: documentId.trim(),
    });



    if (!result) {

      return res.status(404).json({
        success: false,
        message:
          "No AI results found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Controller is working",
      params: req.params,
      result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}; 



/*export const getAIResults = async (req, res) => {

    const allDocs = await AIResult.find();

    console.log("ALL DOCS =", allDocs);

    const first = allDocs[0];

    console.log("DB documentId =", first.documentId);
    console.log("REQ documentId =", req.params.documentId);

    console.log(
        "Equals =",
        first.documentId.equals(req.params.documentId)
    );

    console.log(
        "String DB =",
        first.documentId.toString()
    );

    console.log(
        "String REQ =",
        req.params.documentId
    );

    res.json({
        db: first.documentId.toString(),
        req: req.params.documentId
    });
}; */