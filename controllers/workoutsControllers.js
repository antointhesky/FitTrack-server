import initknex from "knex";
import configuration from "../knexfile.js";
import { validateWorkoutData } from '../utils/validateData.js'; 
const knex = initknex(configuration);

export const getAllWorkouts = async (_req, res) => {
  try {
    const workouts = await knex("workouts");

    if (!workouts.length) {
      return res.status(404).json({ message: "No workouts found" });
    }

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while fetching workouts: ${error}`,
    });
  }
};

export const createWorkout = async (req, res) => {
  const { name, duration, calories_burned, date_completed } = req.body;

  const validation = validateWorkoutData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const [newWorkoutId] = await knex("workouts").insert({
      name,
      duration,
      calories_burned,
      date_completed,
    });

    const newWorkout = await knex("workouts").where({ id: newWorkoutId }).first();

    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while creating a new workout: ${error}`,
    });
  }
};

export const updateWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const workout = await knex("workouts").where({ id: workoutId }).first();

    if (!workout) {
      return res.status(404).json({ message: `Workout with ID ${workoutId} not found` });
    }

    const validation = validateWorkoutData(req.body, true);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    await knex("workouts").where({ id: workoutId }).update(req.body);

    const updatedWorkout = await knex("workouts").where({ id: workoutId }).first();
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while updating workout: ${error}`,
    });
  }
};

export const deleteWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const workout = await knex("workouts").where({ id: workoutId }).first();

    if (!workout) {
      return res.status(404).json({ message: `Workout with ID ${workoutId} not found` });
    }

    await knex("workouts").where({ id: workoutId }).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while deleting workout: ${error}`,
    });
  }
};
