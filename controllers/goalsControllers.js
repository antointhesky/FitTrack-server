import initknex from "knex";
import configuration from "../knexfile.js";
import { validateGoalData } from "../utils/validateData.js";
const knex = initknex(configuration);

// Fetch all goals
export const getAllGoals = async (_req, res) => {
  try {
    const goals = await knex("goals");

    if (!goals.length) {
      return res.status(404).json({ message: "No goals found" });
    }

    return res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error.message);
    return res.status(500).json({
      message: `Error encountered while fetching goals: ${error.message}`,
    });
  }
};

// Create a new goal
export const createGoal = async (req, res) => {
  const { name, target, unit, current_progress, deadline_progress } = req.body;

  // Validate the incoming data
  const validation = validateGoalData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    // Insert new goal
    const [newGoalId] = await knex("goals").insert({
      name,
      target, 
      unit,   
      current_progress,
      deadline_progress,
    });

    // Fetch the newly created goal
    const newGoal = await knex("goals").where({ id: newGoalId }).first();

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while creating a new goal: ${error.message}`,
    });
  }
};

// Update an existing goal
export const updateGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    // Fetch the existing goal
    const goal = await knex("goals").where({ id: goalId }).first();

    if (!goal) {
      return res.status(404).json({ message: `Goal with ID ${goalId} not found` });
    }

    // Validate the incoming data for update
    const validation = validateGoalData(req.body, true);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    // Update the goal
    await knex("goals").where({ id: goalId }).update(req.body);

    // Fetch the updated goal
    const updatedGoal = await knex("goals").where({ id: goalId }).first();

    return res.status(200).json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while updating goal: ${error.message}`,
    });
  }
};
