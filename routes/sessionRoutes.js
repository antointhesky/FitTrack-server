import express from "express";
import {
  createSession,
  getSessionById,
  updateSession,
  deleteExerciseFromSession,
  addExerciseToSession,
  getAllSessions,
  deleteSession,
} from "../controllers/sessionControllers.js";

const router = express.Router();
router.post("/", createSession);
router.get("/:id", getSessionById);
router.put("/:id", updateSession);
router.post("/:id/exercise", addExerciseToSession);
router.delete("/:id/exercise/:exerciseId", deleteExerciseFromSession);
router.get("/", (req, res) => {
  console.log("Fetching all sessions...");
  getAllSessions(req, res);
});
router.delete("/:id", deleteSession);

export default router;
