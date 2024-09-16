export async function seed(knex) {
  await knex("workouts").del();
  await knex("workouts").insert([
    {
      id: 1,
      name: "Cardio",
      duration: "75 min",  
      calories_burned: "700 cal",  
      date_completed: "2024-09-08"  // 2 days ago
    },
    // Strength (performed 1 day ago)
    {
      id: 2,
      name: "Strength",
      duration: "35 min",  
      calories_burned: "450 cal",  
      date_completed: "2024-09-09"  // 1 day ago
    },
    // Fat Burning (performed 3 days ago)
    {
      id: 3,
      name: "Fat Burning",
      duration: "25 min",  
      calories_burned: "450 cal",  
      date_completed: "2024-09-07"  // 3 days ago
    },
    // Health Fitness (performed 4 days ago)
    {
      id: 4,
      name: "Health Fitness",
      duration: "70 min",  
      calories_burned: "250 cal",  
      date_completed: "2024-09-06"  // 4 days ago
    }
  ]);
}