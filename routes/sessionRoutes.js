import express from "express";
import {
  createSession,
  getSessionById,
  updateSession,
  deleteExerciseFromSession,
  addExerciseToSession,
} from "../controllers/sessionControllers.js";

const router = express.Router();
router.post("/", createSession);
router.get("/:id", getSessionById);
router.put("/:id", updateSession);
router.post("/:id/exercise", addExerciseToSession);
router.delete("/:id/exercise/:exerciseId", deleteExerciseFromSession);

export default router;
