export async function seed(knex) {
  await knex("goals").del(); 
  await knex("goals").insert([
    {
      id: 1,
      name: "Complete 50 Push-ups",
      target: 50,
      current_progress: 15,
      unit: "reps", 
      deadline_progress: "2024-10-10",
    },
    {
      id: 2,
      name: "Burn 500 Calories",
      target: 500,
      current_progress: 150,
      unit: "calories",  
      deadline_progress: "2024-10-15",
    },
    {
      id: 3,
      name: "Accumulate 2 Hours of Cardio",
      target: 120, 
      current_progress: 30,
      unit: "minutes", 
      deadline_progress: "2024-11-01",
    },
  ]);
}
