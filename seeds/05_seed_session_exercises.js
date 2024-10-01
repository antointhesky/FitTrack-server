export async function seed(knex) {
    await knex("session_exercises").del();
    await knex("session_exercises").insert([
      {
        session_id: 1,
        exercise_id: 1, // Push-up
        sets: 3,
        reps: 15,
        calories_burned: 50,
        duration: "00:02:00",
      },
      {
        session_id: 1,
        exercise_id: 2, // Burpee
        sets: 3,
        reps: 10,
        calories_burned: 60,
        duration: "00:01:30",
      },
      {
        session_id: 2,
        exercise_id: 3, // Squat
        sets: 3,
        reps: 12,
        calories_burned: 80,
        duration: "00:02:30",
      },
      {
        session_id: 2,
        exercise_id: 4, // Lunges
        sets: 3,
        reps: 10,
        calories_burned: 70,
        duration: "00:02:00",
      },
      {
        session_id: 2,
        exercise_id: 5, // Plank
        sets: 1,
        reps: 1,
        calories_burned: 30,
        duration: "00:01:00",
      },
  
      // Session 3: 5 exercises
      {
        session_id: 3,
        exercise_id: 6, // Mountain Climbers
        sets: 3,
        reps: 15,
        calories_burned: 60,
        duration: "00:01:30",
      },
      {
        session_id: 3,
        exercise_id: 7, // Bicep Curls
        sets: 3,
        reps: 12,
        calories_burned: 50,
        duration: "00:01:30",
      },
      {
        session_id: 3,
        exercise_id: 8, // Tricep Dips
        sets: 3,
        reps: 12,
        calories_burned: 60,
        duration: "00:02:00",
      },
      {
        session_id: 3,
        exercise_id: 9, // Jumping Jacks
        sets: 3,
        reps: 20,
        calories_burned: 40,
        duration: "00:01:00",
      },
      {
        session_id: 3,
        exercise_id: 10, // Crunches
        sets: 3,
        reps: 15,
        calories_burned: 50,
        duration: "00:01:30",
      },
      {
        session_id: 4,
        exercise_id: 11, // Jump Rope
        sets: 4,
        reps: 50,
        calories_burned: 100,
        duration: "00:03:00",
      },
      {
        session_id: 4,
        exercise_id: 12, // High Knees
        sets: 3,
        reps: 40,
        calories_burned: 80,
        duration: "00:02:30",
      },
      {
        session_id: 5,
        exercise_id: 13, // Yoga Stretch
        sets: 2,
        reps: 1,
        calories_burned: 40,
        duration: "00:05:00",
      },
      {
        session_id: 5,
        exercise_id: 14, // Walking
        sets: 1,
        reps: 1,
        calories_burned: 120,
        duration: "00:30:00",
      },
      {
        session_id: 5,
        exercise_id: 15, // Jump Squats
        sets: 3,
        reps: 15,
        calories_burned: 85,
        duration: "00:02:00",
      },
      {
        session_id: 6,
        exercise_id: 16, // Skater Jumps
        sets: 3,
        reps: 20,
        calories_burned: 90,
        duration: "00:02:30",
      },
      {
        session_id: 6,
        exercise_id: 1, // Push-up
        sets: 3,
        reps: 15,
        calories_burned: 50,
        duration: "00:02:00",
      },
      {
        session_id: 6,
        exercise_id: 2, // Burpee
        sets: 3,
        reps: 10,
        calories_burned: 60,
        duration: "00:01:30",
      },
      {
        session_id: 6,
        exercise_id: 3, // Squat
        sets: 3,
        reps: 12,
        calories_burned: 80,
        duration: "00:02:30",
      },
      {
        session_id: 6,
        exercise_id: 4, // Lunges
        sets: 3,
        reps: 10,
        calories_burned: 70,
        duration: "00:02:00",
      },
    ]);
  }
  