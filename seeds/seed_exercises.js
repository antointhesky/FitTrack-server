export async function seed(knex) {
  await knex("exercises").del();
  await knex("exercises").insert([
    { id: 1, name: "Running", sets: 1, reps: 0, duration: "30 min", calories_burned: "300 cal", workout_id: 1 },
    { id: 2, name: "Cycling", sets: 1, reps: 0, duration: "25 min", calories_burned: "250 cal", workout_id: 1 },
    { id: 3, name: "Jumping Jacks", sets: 1, reps: 0, duration: "10 min", calories_burned: "100 cal", workout_id: 1 },
    { id: 4, name: "Treadmill", sets: 1, reps: 0, duration: "10 min", calories_burned: "50 cal", workout_id: 1 },

    // Strength exercises (done on 2024-09-09)
    { id: 5, name: "Bench Press", sets: 4, reps: 12, duration: "15 min", calories_burned: "200 cal", workout_id: 2 },
    { id: 6, name: "Squats", sets: 4, reps: 15, duration: "20 min", calories_burned: "250 cal", workout_id: 2 },

    // Fat Burning exercises (done on 2024-09-07)
    { id: 7, name: "Jump Rope", sets: 1, reps: 0, duration: "10 min", calories_burned: "150 cal", workout_id: 3 },
    { id: 8, name: "Burpees", sets: 3, reps: 20, duration: "15 min", calories_burned: "300 cal", workout_id: 3 },

    // Health Fitness exercises (done on 2024-09-06)
    { id: 9, name: "Yoga", sets: 1, reps: 0, duration: "30 min", calories_burned: "100 cal", workout_id: 4 },
    { id: 10, name: "Pilates", sets: 1, reps: 0, duration: "40 min", calories_burned: "150 cal", workout_id: 4 }
  ]);
}