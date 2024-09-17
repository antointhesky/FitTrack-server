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

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while fetching goals: ${error}`,
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

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while creating a new goal: ${error}`,
    });
  }
};

export const updateGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    const goal = await knex("goals").where({ id: goalId }).first();

    if (!goal) {
      return res.status(404).json({ message: `Goal with ID ${goalId} not found` });
    }

    const validation = validateGoalData(req.body, true);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    await knex("goals").where({ id: goalId }).update(req.body);

    const updatedGoal = await knex("goals").where({ id: goalId }).first();
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: `Error encountered while updating goal: ${error}`,
    });
  }
};
