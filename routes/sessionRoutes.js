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

router.post("/", createSession); 
router.post('/session', createOrUpdateSession);
router.get("/current", getCurrentSession); 
router.get("/:id", getSessionById); 
router.patch("/:id", updateSession); 
router.post("/:id/exercise", addExerciseToSession); 
router.delete("/:id/exercise/:exerciseId", deleteExerciseFromSession); 
router.get("/", getAllSessions); 
router.delete("/:id", deleteSession); 

export default router;