import knex from "../knexfile.js"; 

export const getProgressStats = async (req, res) => {
  try {
    const sessions = await knex("sessions").select("date", "id");
    const sessionExercises = await knex("session_exercises")
      .join("exercises", "session_exercises.exercise_id", "exercises.id")
      .select("session_id", "exercises.calories_burned", "exercises.duration");

    const totalCaloriesBurned = sessionExercises.reduce(
      (total, exercise) => total + exercise.calories_burned,
      0
    );

    const totalDuration = sessionExercises.reduce(
      (total, exercise) => total + parseInt(exercise.duration.split(":")[1]), // Get duration in minutes
      0
    );

    const goals = await knex("goals").select(
      "id",
      "name",
      "target",
      "unit",
      "current_progress"
    );

    res.status(200).json({
      sessions,
      totalCaloriesBurned,
      totalDuration,
      goals,
    });
  } catch (error) {
    console.error("Error fetching progress stats:", error.message);
    res.status(500).json({ message: "Error fetching progress stats." });
  }
};
