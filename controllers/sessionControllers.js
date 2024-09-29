import initknex from "knex";
import configuration from "../knexfile.js";
const knex = initknex(configuration);

export const createSession = async (req, res) => {
  const { exercises, goal_ids } = req.body;

  if (!Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: "Exercises must be a non-empty array" });
  }

  const dateOnly = new Date().toISOString().split("T")[0];

  try {
    const [newSessionId] = await knex("sessions").insert({
      date: dateOnly,
    });

    await knex("session_exercises").insert(
      exercises.map((exercise) => ({
        session_id: newSessionId,
        exercise_id: exercise.id,
      }))
    );

    // Link session with goals
    if (Array.isArray(goal_ids) && goal_ids.length > 0) {
      await knex("session_goals").insert(
        goal_ids.map((goal_id) => ({
          session_id: newSessionId,
          goal_id,
        }))
      );
    }

    res.status(201).json({
      message: "Session created successfully",
      session_id: newSessionId,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({
      message: "Error creating session",
      error: error.message,
    });
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
      .join(
        "session_exercises",
        "exercises.id",
        "session_exercises.exercise_id"
      )
      .where("session_exercises.session_id", sessionId)
      .select(
        "exercises.id",
        "exercises.name",
        "exercises.calories_burned",
        "exercises.workout_type"
      );

    res.status(200).json({ ...session, exercises }); 
  } catch (error) {
    res.status(500).json({ message: `Error fetching session: ${error}` });
  }
};

// Backend: Ensure exercises are saved correctly in the session
export const addExerciseToSession = async (req, res) => {
  const sessionId = req.params.id;
  const { exerciseId } = req.body;

  if (!exerciseId) {
    return res.status(400).json({ message: "exerciseId is required" });
  }

  try {
    // Check if session exists and is marked as draft
    const session = await knex("sessions").where({ id: sessionId, is_draft: true }).first();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Add exercise to session
    await knex("session_exercises").insert({
      session_id: sessionId,
      exercise_id: exerciseId,
    });

    res.status(201).json({ message: "Exercise added to session successfully" });
  } catch (error) {
    console.error("Error adding exercise to session:", error);
    res.status(500).json({ message: `Error adding exercise to session: ${error.message}` });
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
    res.status(500).json({
      message: "Error updating session",
      error: error.message,
    });
  }
};

export const deleteExerciseFromSession = async (req, res) => {
  const { id: sessionId, exerciseId } = req.params;

  try {
    await knex("session_exercises")
      .where({ session_id: sessionId, exercise_id: exerciseId })
      .del();

    res
      .status(200)
      .json({ message: "Exercise removed from session successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Error removing exercise from session: ${error.message}`,
    });
  }
};

export const getAllSessions = async (_req, res) => {
  try {
    const sessions = await knex("sessions").select("*");

    if (!sessions.length) {
      return res.status(404).json({ message: "No sessions found" });
    }

    const sessionsWithExercises = await Promise.all(
      sessions.map(async (session) => {
        const exercises = await knex("exercises")
          .join(
            "session_exercises",
            "exercises.id",
            "session_exercises.exercise_id"
          )
          .where("session_exercises.session_id", session.id)
          .select(
            "exercises.id",
            "exercises.name",
            "exercises.calories_burned",
            "exercises.workout_type",
            "exercises.sets", 
            "exercises.reps",
            knex.raw("ROUND(TIME_TO_SEC(exercises.duration) / 60, 2) as duration") // Round to 2 decimal places
          );

        console.log("Exercises for session:", exercises);

        return { ...session, exercises };
      })
    );

    return res.status(200).json(sessionsWithExercises);
  } catch (error) {
    console.error("Error fetching sessions:", error.message);
    return res.status(500).json({
      message: `Error encountered while fetching sessions: ${error.message}`,
    });
  }
};

export const deleteSession = async (req, res) => {
  const sessionId = req.params.id;

  try {
    await knex("session_exercises").where({ session_id: sessionId }).del();
    await knex("sessions").where({ id: sessionId }).del();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting session: ${error.message}` });
  }
};

export const getCurrentSession = async (req, res) => {
  try {
    // Fetch the most recent ongoing draft session (the latest session marked as is_draft: true)
    const currentSession = await knex("sessions")
      .where({ is_draft: true })
      .orderBy("created_at", "desc")
      .first();

    if (!currentSession) {
      return res.status(404).json({ message: "No ongoing session" });
    }

    // Fetch the exercises associated with the current session
    const exercises = await knex("exercises")
      .join("session_exercises", "exercises.id", "session_exercises.exercise_id")
      .where("session_exercises.session_id", currentSession.id)
      .select("exercises.id", "exercises.name", "exercises.calories_burned", "exercises.workout_type");

    res.status(200).json({ ...currentSession, exercises });
  } catch (error) {
    console.error("Error fetching current session:", error);
    res.status(500).json({ message: `Error fetching current session: ${error.message}` });
  }
};

export const createOrUpdateSession = async (req, res) => {
  const { exercises } = req.body;

  try {
    // Check if there is an ongoing session (draft)
    let currentSession = await knex("sessions").where({ is_draft: true }).first();

    if (!currentSession) {
      // If no ongoing session, create a new one
      const [newSessionId] = await knex("sessions").insert({
        date: new Date().toISOString().split("T")[0],
        is_draft: true, // Mark as draft initially
      });

      currentSession = { id: newSessionId };
    }

    // Insert or update the exercises associated with this session
    if (exercises && exercises.length > 0) {
      // First, delete existing exercises for this session (if applicable)
      await knex("session_exercises").where({ session_id: currentSession.id }).del();

      // Add the new exercises
      await knex("session_exercises").insert(
        exercises.map((exercise) => ({
          session_id: currentSession.id,
          exercise_id: exercise.id,
        }))
      );
    }

    res.status(201).json({
      message: "Session created or updated successfully",
      session_id: currentSession.id,
    });
  } catch (error) {
    console.error("Error creating or updating session:", error);
    res.status(500).json({ message: "Error creating or updating session", error: error.message });
  }
};
