import initknex from "knex";
import configuration from "../knexfile.js";
import { validateGoalData } from "../utils/validateData.js";
const knex = initknex(configuration);

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

export const createGoal = async (req, res) => {
  const { name, target, unit, current_progress, deadline_progress } = req.body;

  const validation = validateGoalData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }
  try {
    const [newGoalId] = await knex("goals").insert({
      name,
      target,
      unit,
      current_progress,
      deadline_progress,
    });
    const newGoal = await knex("goals").where({ id: newGoalId }).first();

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while creating a new goal: ${error.message}`,
    });
  }
};
export const updateGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    const goal = await knex("goals").where({ id: goalId }).first();

    if (!goal) {
      return res
        .status(404)
        .json({ message: `Goal with ID ${goalId} not found` });
    }

    console.log("Request Body:", req.body); // Log the incoming request body

    const validation = validateGoalData(req.body, true);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    await knex("goals")
      .where({ id: goalId })
      .update({
        name: req.body.name,
        target: req.body.target,
        unit: req.body.unit,
        current_progress: req.body.current_progress,
        deadline_progress: new Date(req.body.deadline_progress)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      });
    const updatedGoal = await knex("goals").where({ id: goalId }).first();

    return res.status(200).json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while updating goal: ${error.message}`,
    });
  }
};

// Add this function to handle goal deletion
export const deleteGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    // Try to delete the goal with the specified ID
    const deletedRows = await knex("goals").where({ id: goalId }).del();

    // If no rows were deleted, the goal ID doesn't exist
    if (!deletedRows) {
      return res.status(404).json({ message: `Goal with ID ${goalId} not found` });
    }

    return res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while deleting goal: ${error.message}`,
    });
  }
};

