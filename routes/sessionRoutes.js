import express from "express";
import {
  createSession,
  getSessionById,
  updateSession,
  deleteExerciseFromSession,
  addExerciseToSession,
} from "../controllers/sessionsController.js";

const router = express.Router();

// Create a new session
router.post("/", createSession);

// Get a session by ID
router.get("/:id", getSessionById);

// Update a session (add or remove exercises)
router.put("/:id", updateSession);

// Add an exercise to a session
router.post("/:id/exercise", addExerciseToSession);

// Delete an exercise from a session
router.delete("/:id/exercise/:exerciseId", deleteExerciseFromSession);

export default router;
