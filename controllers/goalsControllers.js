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

  const formattedDeadline = new Date(deadline_progress).toISOString().split('T')[0];

  try {
    const [newGoalId] = await knex("goals").insert({
      name,
      target,
      unit,
      current_progress,
      deadline_progress: formattedDeadline, 
    });

    const newGoal = await knex("goals").where({ id: newGoalId }).first();

    return res.status(201).json(newGoal);
  } catch (error) {
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

    const updatedProgress = Number(req.body.current_progress);
    const formattedDeadline = new Date(req.body.deadline_progress).toISOString().split('T')[0]; // 'yyyy-MM-dd' format

    await knex("goals")
      .where({ id: goalId })
      .update({
        name: req.body.name,
        target: req.body.target,
        unit: req.body.unit,
        current_progress: updatedProgress,
        deadline_progress: formattedDeadline, 
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

export const deleteGoal = async (req, res) => {
  const goalId = req.params.id;

  try {
    const deletedRows = await knex("goals").where({ id: goalId }).del();
    if (!deletedRows) {
      return res
        .status(404)
        .json({ message: `Goal with ID ${goalId} not found` });
    }

    return res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Error encountered while deleting goal: ${error.message}`,
    });
  }
};

export const updateGoalsProgress = async (req, res) => {
  const { exercises } = req.body;

  try {
    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: "Invalid exercises data" });
    }

    const goals = await knex("goals");

    if (!goals.length) {
      return res.status(404).json({ message: "No goals found" });
    }

    for (const goal of goals) {
      let currentProgress = Number(goal.current_progress) || 0;

      const totalProgress = exercises.reduce((sum, exercise) => {
        if (goal.unit === 'cal' && exercise.calories_burned) {
          return sum + Number(exercise.calories_burned || 0);
        } else if (goal.unit === 'reps' && exercise.reps) {
          return sum + Number(exercise.reps || 0);
        } else if (goal.unit === 'sets' && exercise.sets) {
          return sum + Number(exercise.sets || 0);
        } else if (goal.unit === 'hours' && exercise.duration) {
          
          const [hours, minutes] = exercise.duration.split(':');
          return sum + (Number(hours || 0) + Number(minutes || 0) / 60);
        } else if (goal.unit === 'name' && exercise.name === goal.name) {
         
          return sum + 1;
        } else if (goal.unit === 'body part' && exercise.body_part === goal.name) {
        
          return sum + 1;
        } else if (goal.unit === 'workout type' && exercise.workout_type === goal.name) {
        
          return sum + 1;
        }

        return sum;
      }, currentProgress);

      const updatedProgress = Math.min(totalProgress, Number(goal.target));

      if (isNaN(updatedProgress)) {
        return res.status(500).json({ error: `Invalid progress calculation for goal: ${goal.name}` });
      }

      await knex("goals").where({ id: goal.id }).update({
        current_progress: updatedProgress,
      });
    }

    return res.status(200).json({ message: "Goals updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating goals progress." });
  }
};
