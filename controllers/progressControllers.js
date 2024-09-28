import knex from "../knexfile.js"; 

export const getProgressStats = async (req, res) => {
  try {
    // Fetch all sessions and their exercises
    const sessions = await knex("sessions").select("id", "date");
    const sessionExercises = await knex("session_exercises")
      .join("exercises", "session_exercises.exercise_id", "exercises.id")
      .join("sessions", "session_exercises.session_id", "sessions.id")
      .select(
        "sessions.id as session_id",
        "sessions.date",
        "exercises.id as exercise_id",
        "exercises.calories_burned",
        "exercises.duration"
      );

    // Fetch the goals and join them with session exercises
    const goals = await knex("goals")
      .join("exercises", "goals.unit", "=", "exercises.workout_type") // Assuming goals are related to workout type
      .join("session_exercises", "exercises.id", "=", "session_exercises.exercise_id")
      .select(
        "goals.id as goal_id",
        "goals.name as goal_name",
        "goals.target",
        "goals.current_progress",
        knex.raw("SUM(exercises.calories_burned) as total_calories_burned"),
        knex.raw("SUM(TIME_TO_SEC(exercises.duration) / 60) as total_duration")
      )
      .groupBy("goals.id");

    res.status(200).json({
      sessions,
      sessionExercises,
      goals,
    });
  } catch (error) {
    console.error("Error fetching progress stats:", error.message);
    res.status(500).json({ message: "Error fetching progress stats." });
  }
};
