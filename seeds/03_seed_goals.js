export async function seed(knex) {
  await knex("goals").del();
  await knex("goals").insert([
    {
      id: 1,
      name: "Lose Weight",
      target: 5,
      unit: "kg",
      current_progress: "1.5 kg",
      deadline_progress: "2024-12-31",
      exercise_id: 6 
    },
    {
      id: 2,
      name: "Burn Calories",
      target: 5000,
      unit: "cal",
      current_progress: "2300 cal",
      deadline_progress: "2024-12-15",
      exercise_id: 2 
    },
    {
      id: 4,
      name: "Complete Workouts",
      target: 30,
      unit: "workouts",
      current_progress: "15 workouts",
      deadline_progress: "2024-11-30",
      exercise_id: 1 
    },
    {
      id: 6,
      name: "Gain Muscle",
      target: 3,
      unit: "kg",
      current_progress: "1 kg",
      deadline_progress: "2024-11-15",
      exercise_id: 7 
    },
  ]);
}