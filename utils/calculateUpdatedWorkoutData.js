export const calculateUpdatedWorkoutData = (exercises) => {
    let totalDuration = 0;
    let totalCalories = 0;
  
    exercises.forEach((exercise) => {
      totalDuration += parseTimeToMinutes(exercise.duration); // Assuming duration is stored in "HH:MM:SS" format
      totalCalories += exercise.calories_burned;
    });
  
    return {
      updatedDuration: formatMinutesToTime(totalDuration),
      updatedCalories: totalCalories,
    };
  };
  
  // Helper to convert time "HH:MM:SS" to total minutes
  const parseTimeToMinutes = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  };
  
  // Helper to format total minutes back to "HH:MM:SS" time format
  const formatMinutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };
  