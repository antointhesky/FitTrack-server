const validationRules = {
  // Updated regex for validating the new units
  targetUnitRegex: /^(cal|reps|sets|hours|name|body part|workout type)$/,
  requiredWorkoutFields: ["name", "duration", "calories_burned", "date_completed"],
  requiredGoalFields: ["name", "target", "unit", "current_progress", "deadline_progress"],
};

export const validateWorkoutData = (data, isUpdate = false) => {
  const { requiredWorkoutFields } = validationRules;

  // If it's not an update, check if required fields are present
  if (!isUpdate) {
    for (let field of requiredWorkoutFields) {
      if (!data[field]) {
        return { valid: false, message: `The field ${field} is required.` };
      }
    }
  }

  // Check if calories_burned is a valid number, if it's provided
  if (data.calories_burned && isNaN(Number(data.calories_burned))) {
    return { valid: false, message: "Calories burned must be a number." };
  }

  // Check if the unit is valid based on the updated targetUnitRegex
  if (data.unit && !validationRules.targetUnitRegex.test(data.unit)) {
    return { valid: false, message: `The unit ${data.unit} is not valid.` };
  }

  return { valid: true };
};

export const validateGoalData = (data, isUpdate = false) => {
  const { targetUnitRegex, requiredGoalFields } = validationRules;

  // Check if required fields are present when it's not an update
  if (!isUpdate) {
    for (let field of requiredGoalFields) {
      if (!data[field]) {
        return { valid: false, message: `The field ${field} is required.` };
      }
    }
  }

  // Ensure the target is a valid number
  if (data.target && isNaN(Number(data.target))) {
    return { valid: false, message: "Target must be a number." };
  }

  // Validate the unit against the updated regex (new units included)
  if (data.unit && !targetUnitRegex.test(data.unit)) {
    return {
      valid: false,
      message: "Unit must be one of the following: cal, reps, sets, hours, name, body part, workout type.",
    };
  }

  return { valid: true };
};

  export const validateGoalProgressData = (data) => {
    // Only check if current_progress is valid and a number
    if (data.current_progress && isNaN(Number(data.current_progress))) {
      return { valid: false, message: "Current progress must be a number." };
    }
  
    return { valid: true };
  };
  
  