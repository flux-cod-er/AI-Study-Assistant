import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  uploadDocument,
  getDocumentById,
  getMyDocuments,
  deleteDocument,
  getDashboardSummary,
  searchDocuments,
  getRecentUploads,
  getDashboardStats,
} from "../controllers/document.controller.js";

const router = express.Router();

// Upload PDF
router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadDocument
);

// Dashboard
router.get(
  "/dashboard",
  protect,
  getDashboardSummary
);

// Search documents
router.get(
  "/search",
  protect,
  searchDocuments
);

router.get(
  "/recent",
  protect,
  getRecentUploads
);

router.get(
  "/stats",
  protect,
  getDashboardStats
);

// Get all documents
router.get(
  "/",
  protect,
  getMyDocuments
);

// Get one document
router.get(
  "/:id",
  protect,
  getDocumentById
);

// Delete document
router.delete(
  "/:id",
  protect,
  deleteDocument
);  



export default router;