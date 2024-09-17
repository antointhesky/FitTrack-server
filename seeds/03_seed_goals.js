export async function seed(knex) {
    await knex("goals").del();
    await knex("goals").insert([
      {
        id: 1,
        name: "Lose Weight",
        target: "5 kg",
        current_progress: "1.5 kg",
        deadline_progress: "2024-12-31"
      },
      {
        id: 2,
        name: "Burn Calories",
        target: "5000 cal",
        current_progress: "2300 cal",
        deadline_progress: "2024-12-15"
      },
      {
        id: 3,
        name: "Run Distance",
        target: "100 km",
        current_progress: "50 km",
        deadline_progress: "2024-12-10"
      },
      {
        id: 4,
        name: "Complete Workouts",
        target: "30 workouts",
        current_progress: "15 workouts",
        deadline_progress: "2024-11-30"
      },
      {
        id: 5,
        name: "Walk Steps",
        target: "10000 steps",
        current_progress: "6000 steps",
        deadline_progress: "2024-12-01"
      },
      {
        id: 6,
        name: "Gain Muscle",
        target: "3 kg",
        current_progress: "1 kg",
        deadline_progress: "2024-11-15"
      },
      {
        id: 7,
        name: "Swim Distance",
        target: "50 km",
        current_progress: "20 km",
        deadline_progress: "2024-12-20"
      },
      {
        id: 8,
        name: "Do Push-ups",
        target: "1000 push-ups",
        current_progress: "600 push-ups",
        deadline_progress: "2024-12-05"
      },
      {
        id: 9,
        name: "Cycling",
        target: "500 km",
        current_progress: "200 km",
        deadline_progress: "2024-12-25"
      },
      {
        id: 10,
        name: "Plank Hold",
        target: "60 min",
        current_progress: "30 min",
        deadline_progress: "2024-11-25"
      }
    ]);
  }
  