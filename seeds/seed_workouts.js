export async function seed(knex) {
  await knex("workouts").del();
  await knex("workouts").insert([
    {
      id: 1,
      workout_name: "Cardio",
      duration: "50 minutes",  
      calories_burned: "400 cal",  
      date: knex.fn.now()
    },
    {
      id: 2,
      workout_name: "Strength",
      duration: "60 minutes",
      calories_burned: "250 cal",
      date: knex.fn.now()
    },
    {
      id: 3,
      workout_name: "Fat Burning",
      duration: "30 minutes",
      calories_burned: "300 cal",
      date: knex.fn.now()
    },
    {
      id: 4,
      workout_name: "Health Fitness",
      duration: "50 minutes",
      calories_burned: "200 cal",
      date: knex.fn.now()
    },
    {
      id: 5,
      workout_name: "Cardio",
      duration: "35 minutes",
      calories_burned: "300 cal",
      date: knex.fn.now()
    },
    {
      id: 6,
      workout_name: "Strength",
      duration: "75 minutes",
      calories_burned: "300 cal",
      date: knex.fn.now()
    },
    {
      id: 7,
      workout_name: "Fat Burning",
      duration: "40 minutes",
      calories_burned: "350 cal",
      date: knex.fn.now()
    },
    {
      id: 8,
      workout_name: "Health Fitness",
      duration: "55 minutes",
      calories_burned: "220 cal",
      date: knex.fn.now()
    },
    {
      id: 9,
      workout_name: "Cardio",
      duration: "50 minutes",
      calories_burned: "420 cal",
      date: knex.fn.now()
    },
    {
      id: 10,
      workout_name: "Strength",
      duration: "90 minutes",
      calories_burned: "350 cal",
      date: knex.fn.now()
    }
  ]);
}

