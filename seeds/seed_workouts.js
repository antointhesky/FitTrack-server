export async function seed(knex) {
  await knex("workouts").del();
  await knex("workouts").insert([
    {
      id: 1,
      name: "Cardio",
      duration: "01:15:00",
      calories_burned: 700,
      date_completed: "2024-09-08",
    },
    {
      id: 2,
      name: "Strength",
      duration: "00:35:00",
      calories_burned: 450,
      date_completed: "2024-09-09",
    },
    {
      id: 3,
      name: "Fat Burning",
      duration: "00:25:00",
      calories_burned: 450,
      date_completed: "2024-09-07",
    },
    {
      id: 4,
      name: "Health Fitness",
      duration: "01:10:00",
      calories_burned: 250,
      date_completed: "2024-09-06",
    },
  ]);
}
