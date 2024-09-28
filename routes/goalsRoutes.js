import express from "express";
import {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalsProgress,
} from "../controllers/goalsControllers.js";

const router = express.Router();
router.get("/", getAllGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);
router.patch("/update-goals-progress", updateGoalsProgress);

export default router;
