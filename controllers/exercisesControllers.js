import initknex from "knex";
import configuration from "../knexfile.js";
import { calculateUpdatedWorkoutData } from "../utils/calculateUpdatedWorkoutData.js";
const knex = initknex(configuration);

export const getAllExercises = async (req, res) => {
  try {
    const { workout_type } = req.query;

    let exercises;
    if (workout_type) {
      // Fetch exercises filtered by workout_type
      exercises = await knex("exercises").where({ workout_type });
    } else {
      // Fetch all exercises if no workout_type is provided
      exercises = await knex("exercises");
    }

    if (!exercises.length) {
      return res.status(404).json({ message: "No exercises found" });
    }

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching exercises: ${error}`,
    });
  }
};

export const getSingleExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await knex("exercises").where({ id: exerciseId }).first();

    if (!exercise) {
      return res
        .status(404)
        .json({ message: `Exercise with ID ${exerciseId} not found` });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching exercise: ${error}`,
    });
  }
};

export const addExerciseToWorkout = async (req, res) => {
  const workoutId = req.params.id;
  const { name, sets, reps, duration, calories_burned } = req.body;

  try {
    const [newExerciseId] = await knex("exercises").insert({
      name,
      sets,
      reps,
      duration,
      calories_burned,
      workout_id: workoutId,
    });

    const exercises = await knex("exercises").where({ workout_id: workoutId });
    const { updatedDuration, updatedCalories } =
      calculateUpdatedWorkoutData(exercises);
    await knex("workouts").where({ id: workoutId }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res.status(201).json({ message: "Exercise added and workout updated" });
  } catch (error) {
    res.status(500).json({
      message: `Error while adding exercise to workout: ${error}`,
    });
  }
};

export const updateExercise = async (req, res) => {
  const exerciseId = req.params.id;
  const { name, sets, reps, duration, calories_burned } = req.body;
  try {
    const exercise = await knex("exercises").where({ id: exerciseId }).first();
    if (!exercise) {
      return res
        .status(404)
        .json({ message: `Exercise with ID ${exerciseId} not found` });
    }
    await knex("exercises").where({ id: exerciseId }).update({
      name,
      sets,
      reps,
      duration,
      calories_burned,
    });

    const exercises = await knex("exercises").where({
      workout_id: exercise.workout_id,
    });
    const { updatedDuration, updatedCalories } =
      calculateUpdatedWorkoutData(exercises);
    await knex("workouts").where({ id: exercise.workout_id }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res
      .status(200)
      .json({ message: "Exercise and workout updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Error while updating exercise: ${error}`,
    });
  }
};

export const deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await knex("exercises").where({ id: exerciseId }).first();

    if (!exercise) {
      return res
        .status(404)
        .json({ message: `Exercise with ID ${exerciseId} not found` });
    }

    // Delete the exercise
    await knex("exercises").where({ id: exerciseId }).del();

    // Fetch updated exercises for the workout
    const exercises = await knex("exercises").where({
      workout_id: exercise.workout_id,
    });

    // Recalculate the workout data
    const { updatedDuration, updatedCalories } =
      calculateUpdatedWorkoutData(exercises);

    // Update the workout with new duration and calories
    await knex("workouts").where({ id: exercise.workout_id }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Error while deleting exercise: ${error}`,
    });
  }
};
