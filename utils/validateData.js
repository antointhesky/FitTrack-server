const validationRules = {
    targetUnitRegex: /^(kg|cal|km|steps|workouts)$/,
    requiredWorkoutFields: ["name", "duration", "calories_burned", "date_completed"],
    requiredGoalFields: ["name", "target", "unit", "current_progress", "deadline_progress"],
  };
  
  export const validateWorkoutData = (data, isUpdate = false) => {
    const { requiredWorkoutFields } = validationRules;
  
    if (!isUpdate) {
      for (let field of requiredWorkoutFields) {
        if (!data[field]) {
          return { valid: false, message: `The field ${field} is required.` };
        }
      }
    }
  
    if (data.calories_burned && isNaN(Number(data.calories_burned))) {
      return { valid: false, message: "Calories burned must be a number." };
    }
  
    return { valid: true };
  };
  
  export const validateGoalData = (data, isUpdate = false) => {
    const { targetUnitRegex, requiredGoalFields } = validationRules;
  
    if (!isUpdate) {
      for (let field of requiredGoalFields) {
        if (!data[field]) {
          return { valid: false, message: `The field ${field} is required.` };
        }
      }
    }
  
    if (data.target && isNaN(Number(data.target))) {
      return { valid: false, message: "Target must be a number." };
    }
  
    if (data.unit && !targetUnitRegex.test(data.unit)) {
      return {
        valid: false,
        message: "Unit must be one of the following: kg, cal, km, steps, workouts.",
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
  
  