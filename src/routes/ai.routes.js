import express from "express";

import protect from "../middleware/auth.middleware.js";

import { createSummary,createDetailedNotes,createQuiz,createInterviewQuestions,createFlashcards ,getAIResults } from "../controllers/ai.controller.js";

const router = express.Router();

router.post( "/summary", protect, createSummary );
router.post("/detailed-notes", protect, createDetailedNotes );
router.post("/quiz", protect, createQuiz );
router.post("/interview-questions", protect, createInterviewQuestions );
router.post("/flashcards", protect, createFlashcards );
router.get("/results/:documentId", protect, getAIResults );
export default router;