export const calculateUpdatedWorkoutData = (exercises) => {
    let totalDuration = 0;
    let totalCalories = 0;
  
    exercises.forEach((exercise) => {
      totalDuration += parseTimeToMinutes(exercise.duration); 
      totalCalories += exercise.calories_burned;
    });
  
    return {
      updatedDuration: formatMinutesToTime(totalDuration),
      updatedCalories: totalCalories,
    };
  };
  
 
  const parseTimeToMinutes = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  };
  
  const formatMinutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };
  