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

  // Validate the incoming goal data
  const validation = validateGoalData(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  // Ensure the deadline_progress is in the format YYYY-MM-DD
  const formattedDeadline = new Date(deadline_progress).toISOString().split('T')[0];

  try {
    // Insert the new goal with formatted deadline
    const [newGoalId] = await knex("goals").insert({
      name,
      target,
      unit,
      current_progress,
      deadline_progress: formattedDeadline, // Use the formatted date
    });

    // Fetch the newly created goal from the database
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

    // Ensure the correct types for fields
    const updatedProgress = Number(req.body.current_progress);
    const formattedDeadline = new Date(req.body.deadline_progress).toISOString().split('T')[0]; // 'yyyy-MM-dd' format

    // Update the goal
    await knex("goals")
      .where({ id: goalId })
      .update({
        name: req.body.name,
        target: req.body.target,
        unit: req.body.unit,
        current_progress: updatedProgress,
        deadline_progress: formattedDeadline, // Ensure correct format for date
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
      return res
        .status(404)
        .json({ message: `Goal with ID ${goalId} not found` });
    }

    return res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error.message);
    return res.status(500).json({
      message: `Error encountered while deleting goal: ${error.message}`,
    });
  }
};

export const updateGoalsProgress = async (req, res) => {
  const { exercises } = req.body;

  // Log the incoming request body for debugging
  console.log("Request Body:", req.body);

  try {
    // Ensure exercises array is valid
    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: "Invalid exercises data" });
    }

    // Fetch all goals from the database
    const goals = await knex("goals");

    if (!goals.length) {
      return res.status(404).json({ message: "No goals found" });
    }

    // Loop through all goals and update their progress based on exercises
    for (const goal of goals) {
      let currentProgress = Number(goal.current_progress) || 0;

      // Log the goal and its current progress for debugging
      console.log(`Updating Goal: ${goal.name} (Current Progress: ${currentProgress}, Target: ${goal.target})`);

      // Calculate progress based on the goal's unit
      const totalProgress = exercises.reduce((sum, exercise) => {
        if (goal.unit === 'cal' && exercise.calories_burned) {
          return sum + Number(exercise.calories_burned || 0);
        } else if (goal.unit === 'reps' && exercise.reps) {
          return sum + Number(exercise.reps || 0);
        } else if (goal.unit === 'sets' && exercise.sets) {
          return sum + Number(exercise.sets || 0);
        } else if (goal.unit === 'hours' && exercise.duration) {
          // Convert "hh:mm:ss" format to hours
          const [hours, minutes] = exercise.duration.split(':');
          return sum + (Number(hours || 0) + Number(minutes || 0) / 60);
        } else if (goal.unit === 'name' && exercise.name === goal.name) {
          // Increment for exercise name match
          return sum + 1;
        } else if (goal.unit === 'body part' && exercise.body_part === goal.name) {
          // Increment for body part match
          return sum + 1;
        } else if (goal.unit === 'workout type' && exercise.workout_type === goal.name) {
          // Increment for workout type match
          return sum + 1;
        }

        // If no condition matches, return the existing sum
        return sum;
      }, currentProgress);

      const updatedProgress = Math.min(totalProgress, Number(goal.target));

      // Ensure current_progress is updated with a valid number
      if (isNaN(updatedProgress)) {
        console.error(`Invalid progress calculation for goal: ${goal.name}`);
        return res.status(500).json({ error: `Invalid progress calculation for goal: ${goal.name}` });
      }

      // Log the updated progress
      console.log(`New Progress for ${goal.name}: ${updatedProgress}`);

      // Update the goal progress in the database
      await knex("goals").where({ id: goal.id }).update({
        current_progress: updatedProgress,
      });
    }

    return res.status(200).json({ message: "Goals updated successfully" });
  } catch (error) {
    console.error("Error updating goals progress:", error);
    return res.status(500).json({ error: "Error updating goals progress." });
  }
};
