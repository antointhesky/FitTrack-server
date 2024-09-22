import initknex from 'knex'; // for knex configuration
import configuration from '../knexfile.js'; // knex configuration
const knex = initknex(configuration); // initializing knex with configuration

export const getProgressData = async (req, res) => {
    const { timeframe } = req.query;
    let startDate;
  
    if (timeframe === "weekly") {
      startDate = knex.fn.now().subtract(7, "days");
    } else if (timeframe === "monthly") {
      startDate = knex.fn.now().subtract(30, "days");
    } else if (timeframe === "yearly") {
      startDate = knex.fn.now().subtract(365, "days");
    }
  
    try {
      const progressData = await knex("sessions")
        .whereBetween("date", [startDate, knex.fn.now()])
        .join("session_exercises", "sessions.id", "session_exercises.session_id")
        .join("exercises", "session_exercises.exercise_id", "exercises.id")
        .select(knex.raw("DATE(sessions.date) as date"), knex.raw("SUM(exercises.calories_burned) as total_calories"))
        .groupBy("sessions.date");
  
      res.status(200).json(progressData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress data: " + error.message });
    }
  };
  