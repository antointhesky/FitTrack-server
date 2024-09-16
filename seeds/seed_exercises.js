export async function seed(knex) {
  await knex("exercises").del();
  await knex("exercises").insert([
    {
      id: 1,
      exercise_name: "Push-Up",
      sets: 3,
      reps: 15,
      duration: "10 minutes",  
      calories_burned: "100 cal",  
      workout_id: 1 // Linked to a workout (assume workout_id 1 exists)
    },
    {
      id: 2,
      exercise_name: "Squat",
      sets: 4,
      reps: 12,
      duration: "12 minutes",
      calories_burned: "150 cal",
      workout_id: 1
    },
    {
      id: 3,
      exercise_name: "Running",
      sets: 1,
      reps: 0,
      duration: "30 minutes",
      calories_burned: "300 cal",
      workout_id: 2 
    },
    {
      id: 4,
      exercise_name: "Bicep Curls",
      sets: 3,
      reps: 12,
      duration: "15 minutes",
      calories_burned: "80 cal",
      workout_id: 2
    },
    {
      id: 5,
      exercise_name: "Lunges",
      sets: 3,
      reps: 15,
      duration: "10 minutes",
      calories_burned: "100 cal",
      workout_id: 3
    },
    {
      id: 6,
      exercise_name: "Plank",
      sets: 3,
      reps: 1,
      duration: "5 minutes",
      calories_burned: "50 cal",
      workout_id: 3
    },
    {
      id: 7,
      exercise_name: "Jump Rope",
      sets: 1,
      reps: 0,
      duration: "20 minutes",
      calories_burned: "250 cal",
      workout_id: 4
    },
    {
      id: 8,
      exercise_name: "Deadlift",
      sets: 4,
      reps: 10,
      duration: "15 minutes",
      calories_burned: "200 cal",
      workout_id: 4
    }
  ]);
}

