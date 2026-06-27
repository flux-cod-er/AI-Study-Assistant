import Document from "../models/document.model.js";
import fs from "fs";
import extractTextFromPDF
from "../services/pdf.service.js";
import AIResult from "../models/aiResult.model.js";

export const uploadDocument = async (
  req,
  res
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText =
      await extractTextFromPDF(
        req.file.path
      );

    const document =
      await Document.create({
        userId: req.user.id,
        originalFileName:
          req.file.originalname,
        filePath: req.file.path,
        extractedText,
      });

    res.status(201).json({
      success: true,
      document,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get a document by ID 
export const getDocumentById =
async (req, res) => {

  try {

    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get all documents for the authenticated user
export const getMyDocuments = async (req, res) => {
  try {

    const documents = await Document
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete a document by ID
export const deleteDocument =
async (req, res) => {

  try {

    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {
      return res.status(404).json({
        success:false,
        message:"Document not found"
      });
    }

    fs.unlinkSync(document.filePath);

    await AIResult.deleteOne({
      documentId: document.id
    });

    await document.deleteOne();

    res.status(200).json({
      success:true,
      message:"Document deleted"
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

//dashboard summary get summary of all documents for the authenticated user

export const getDashboardSummary = async (req, res) => {
  try {

    const documents = await Document.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    const dashboard = [];

    for (const doc of documents) {

      const aiResult = await AIResult.findOne({
        documentId: doc.id,
      });

      dashboard.push({
        title: doc.originalFileName,

        summaryGenerated: !!aiResult?.summary,

        quizGenerated: !!aiResult?.quiz,

        flashcardsGenerated: !!aiResult?.flashcards,

        interviewGenerated: !!aiResult?.interviewQuestions,
      });
    }

    res.status(200).json({
      success: true,
      documents: dashboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Search documents by title for the authenticated user

export const searchDocuments = async (req, res) => {
  try {

    const q = req.query.q;

    const documents = await Document.find({
      userId: req.user.id,

      originalFileName: {
        $regex: q,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get recent uploads for the authenticated user

export const getRecentUploads = async (req, res) => {
  try {

    const documents = await Document.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("originalFileName createdAt");

    res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//  

export const getDashboardStats = async (req, res) => {
  try {

    const totalDocuments = await Document.countDocuments({
      userId: req.user._id,
    });

    const aiResults = await AIResult.find({
      userId: req.user._id,
    });

    const summaries = aiResults.filter(
      item => item.summary
    ).length;

    const quizzes = aiResults.filter(
      item => item.quiz
    ).length;

    const flashcards = aiResults.filter(
      item => item.flashcards
    ).length;

    const interviewQuestions = aiResults.filter(
      item => item.interviewQuestions
    ).length;

    res.status(200).json({
      success: true,

      totalDocuments,

      summaries,

      quizzes,

      flashcards,

      interviewQuestions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
