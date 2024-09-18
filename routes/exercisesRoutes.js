import express from "express";
import {
  addExerciseToWorkout,
  getAllExercises,
  getSingleExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercisesControllers.js";

const router = express.Router();

router.post("/workouts/:id/exercise", addExerciseToWorkout);
router.get("/", getAllExercises);
router.get("/:id", getSingleExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
