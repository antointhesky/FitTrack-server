import express from "express";
import {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal // Import the delete function
} from "../controllers/goalsControllers.js";

const router = express.Router();
router.get("/", getAllGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal); // Add this route

export default router;

