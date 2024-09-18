import initknex from "knex";
import configuration from "../knexfile.js";
import { calculateUpdatedWorkoutData } from "../utils/calculateUpdatedWorkoutData.js";
const knex = initknex(configuration);

// Create a new session
export const createSession = async (req, res) => {
  const { workout_type, exercises, date } = req.body;

  try {
    const [newSessionId] = await knex("sessions").insert({
      workout_type,
      date,
    });

    // Add exercises to the session
    for (let exercise of exercises) {
      await knex("session_exercises").insert({
        session_id: newSessionId,
        exercise_id: exercise.id,
      });
    }

    res.status(201).json({ message: "Session created successfully", session_id: newSessionId });
  } catch (error) {
    res.status(500).json({
      message: `Error creating session: ${error}`,
    });
  }
};

// Get a session by ID (with associated exercises)
export const getSessionById = async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await knex("sessions").where({ id: sessionId }).first();
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const exercises = await knex("exercises")
      .join("session_exercises", "exercises.id", "session_exercises.exercise_id")
      .where("session_exercises.session_id", sessionId)
      .select("exercises.*");

    res.status(200).json({ session, exercises });
  } catch (error) {
    res.status(500).json({
      message: `Error fetching session: ${error}`,
    });
  }
};

// Add an exercise to a session
export const addExerciseToSession = async (req, res) => {
  const sessionId = req.params.id;
  const { exerciseId } = req.body;

  try {
    await knex("session_exercises").insert({
      session_id: sessionId,
      exercise_id: exerciseId,
    });

    const exercises = await knex("exercises")
      .join("session_exercises", "exercises.id", "session_exercises.exercise_id")
      .where("session_exercises.session_id", sessionId);

    const { updatedDuration, updatedCalories } = calculateUpdatedWorkoutData(exercises);

    await knex("sessions").where({ id: sessionId }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res.status(201).json({ message: "Exercise added to session and stats updated" });
  } catch (error) {
    res.status(500).json({
      message: `Error adding exercise to session: ${error}`,
    });
  }
};

// Update a session (e.g., edit exercises)
export const updateSession = async (req, res) => {
  const sessionId = req.params.id;
  const { workout_type, exercises } = req.body;

  try {
    await knex("sessions").where({ id: sessionId }).update({ workout_type });

    // Update exercises in session
    await knex("session_exercises").where({ session_id: sessionId }).del(); // Clear existing exercises

    for (let exercise of exercises) {
      await knex("session_exercises").insert({
        session_id: sessionId,
        exercise_id: exercise.id,
      });
    }

    const updatedExercises = await knex("exercises")
      .join("session_exercises", "exercises.id", "session_exercises.exercise_id")
      .where("session_exercises.session_id", sessionId);

    const { updatedDuration, updatedCalories } = calculateUpdatedWorkoutData(updatedExercises);

    await knex("sessions").where({ id: sessionId }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Error updating session: ${error}`,
    });
  }
};

// Delete an exercise from a session and update stats
export const deleteExerciseFromSession = async (req, res) => {
  const { id: sessionId, exerciseId } = req.params;

  try {
    await knex("session_exercises").where({ session_id: sessionId, exercise_id: exerciseId }).del();

    const exercises = await knex("exercises")
      .join("session_exercises", "exercises.id", "session_exercises.exercise_id")
      .where("session_exercises.session_id", sessionId);

    const { updatedDuration, updatedCalories } = calculateUpdatedWorkoutData(exercises);

    await knex("sessions").where({ id: sessionId }).update({
      duration: updatedDuration,
      calories_burned: updatedCalories,
    });

    res.status(200).json({ message: "Exercise removed and session updated" });
  } catch (error) {
    res.status(500).json({
      message: `Error removing exercise from session: ${error}`,
    });
  }
};
