export async function seed(knex) {
  await knex("exercises").del();
  await knex("exercises").insert([
  
    { id: 1, 
      name: "Running", 
      sets: 1, reps: 0, 
      duration: "00:30:00", 
      calories_burned: 300, 
      workout_id: 1 
    },
    { id: 2, 
      name: "Cycling", 
      sets: 1, reps: 0, 
      duration: "00:25:00", 
      calories_burned: 250, 
      workout_id: 1 
    },
    { id: 3, 
      name: "Jumping Jacks", 
      sets: 1, reps: 0, 
      duration: "00:10:00", 
      calories_burned: 100, 
      workout_id: 1 
    },
    { id: 4, 
      name: "Treadmill", 
      sets: 1, 
      reps: 0, 
      duration: "00:10:00", 
      calories_burned: 50, 
      workout_id: 1 
    },
    { id: 5, 
      name: "Bench Press", 
      sets: 4, 
      reps: 12, 
      duration: "00:15:00", 
      calories_burned: 200, 
      workout_id: 2 
    },
    { id: 6, 
      name: "Squats", 
      sets: 4, 
      reps: 15, 
      duration: "00:20:00", 
      calories_burned: 250, 
      workout_id: 2 
    },
    { id: 7, 
      name: "Jump Rope", 
      sets: 1, reps: 0, 
      duration: "00:10:00", 
      calories_burned: 150, 
      workout_id: 3 
    },
    { id: 8, 
      name: "Burpees", 
      sets: 3, 
      reps: 20, 
      duration: "00:15:00", 
      calories_burned: 300, 
      workout_id: 3 
    },
    { id: 9, 
      name: "Yoga", 
      sets: 1, reps: 0, 
      duration: "00:30:00", 
      calories_burned: 100, 
      workout_id: 4 
    },
    { id: 10, 
      name: "Pilates", 
      sets: 1, 
      reps: 0, 
      duration: "00:40:00", 
      calories_burned: 150, 
      workout_id: 4 
    }
  ]);
}
