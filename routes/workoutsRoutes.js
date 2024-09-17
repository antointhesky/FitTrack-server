import express from "express";
import {
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutsControllers.js";

const router = express.Router();

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
