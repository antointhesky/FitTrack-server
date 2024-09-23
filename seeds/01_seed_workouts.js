export async function seed(knex) {
  await knex("workouts").del();
  await knex("workouts").insert([
    { id: 1, 
      name: 'Cardio', 
      description: 'Boost your cardiovascular fitness', 
      imageUrl: '/images/cardio.png' 
    },
    { id: 2, 
      name: 'Strength', 
      description: 'Build muscle and strength', 
      imageUrl: '/images/strength.png' 
    },
    { id: 3, 
      name: 'Fat Burning', 
      description: 'Lose fat with intense workouts', 
      imageUrl: '/images/fat_burning.png' 
    },
    { id: 4, 
      name: 'Health Fitness', 
      description: 'General wellness exercises', 
      imageUrl: '/images/health_fitness.png' 
    },
  ]);
}