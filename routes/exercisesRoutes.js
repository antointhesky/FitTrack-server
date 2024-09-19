import express from "express";
import {
  getAllExercises,
  getSingleExercise,
  addExerciseToWorkout,
  updateExercise,
  deleteExercise,
} from "../controllers/exercisesControllers.js";

const router = express.Router();

router.get("/", getAllExercises); // This route now supports filtering by workout_type
router.get("/:id", getSingleExercise);
router.post("/workouts/:id/exercise", addExerciseToWorkout);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
