import initknex from "knex";
import configuration from "../knexfile.js";
import { calculateUpdatedWorkoutData } from "../utils/calculateUpdatedWorkoutData.js";
const knex = initknex(configuration);

export const createSession = async (req, res) => {
  const { date } = req.body;

  try {
    const [newSessionId] = await knex("sessions").insert({ date });

    res.status(201).json({ message: "Session created successfully", session_id: newSessionId });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Error creating session", error: error.message });
  }
};

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
      .select("exercises.*", "session_exercises.count"); 

    res.status(200).json({ session, exercises });
  } catch (error) {
    res.status(500).json({ message: `Error fetching session: ${error}` });
  }
};


export const addExerciseToSession = async (req, res) => {
  const sessionId = req.params.id;
  const { exerciseId, count } = req.body;

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
    res.status(500).json({ message: `Error adding exercise to session: ${error}` });
  }
};


export const updateSession = async (req, res) => {
  const sessionId = req.params.id;
  const { exercises } = req.body;

  try {
    await knex("session_exercises").where({ session_id: sessionId }).del();

    for (let exercise of exercises) {
      await knex("session_exercises").insert({
        session_id: sessionId,
        exercise_id: exercise.id,
      });
    }

    res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating session", error: error.message });
  }
};

export const deleteExerciseFromSession = async (req, res) => {
  const { id: sessionId, exerciseId } = req.params;

  try {
    await knex("session_exercises").where({ session_id: sessionId, exercise_id: exerciseId }).del();

    res.status(200).json({ message: "Exercise removed from session successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error removing exercise from session: ${error.message}` });
  }
};


// export const getWeeklyProgress = async (req, res) => {
//   try {
//     const weeklyData = await knex("sessions")
//       .whereBetween("date", [knex.fn.now().subtract(7, "days"), knex.fn.now()])
//       .join("session_exercises", "sessions.id", "session_exercises.session_id")
//       .join("exercises", "exercises.id", "session_exercises.exercise_id")
//       .select(knex.raw("SUM(exercises.calories_burned) as total_calories"));

//     res.status(200).json(weeklyData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching weekly progress" });
//   }
// };

