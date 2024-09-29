import express from "express";
import {
  createSession,
  getSessionById,
  updateSession,
  addExerciseToSession,
  deleteExerciseFromSession,
  getAllSessions,
  deleteSession,
  getCurrentSession,
  createOrUpdateSession
} from "../controllers/sessionControllers.js";

const router = express.Router();

router.post("/", createSession); // Create a new session
router.post('/session', createOrUpdateSession);
router.get("/current", getCurrentSession); // Fetch current draft session
router.get("/:id", getSessionById); // Fetch session by ID
router.patch("/:id", updateSession); // Update session (mark as completed)
router.post("/:id/exercise", addExerciseToSession); // Add exercise to session
router.delete("/:id/exercise/:exerciseId", deleteExerciseFromSession); // Remove exercise from session
router.get("/", getAllSessions); // Fetch all sessions
router.delete("/:id", deleteSession); // Delete session

export default router;

