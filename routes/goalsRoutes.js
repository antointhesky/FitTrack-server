import express from "express";
import {
  getAllGoals,
  createGoal,
  updateGoal
} from "../controllers/goalsControllers.js";

const router = express.Router();
router.get("/", getAllGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);

export default router;
