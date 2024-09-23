import initknex from "knex";
import configuration from "../knexfile.js";

const knex = initknex(configuration);

export const getAllWorkouts = async (_req, res) => {
  try {
    const workouts = await knex('workouts'); 
    if (!workouts.length) {
      return res.status(404).json({ message: 'No workouts found' });
    }
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: `Error fetching workouts: ${error.message}` });
  }
};
