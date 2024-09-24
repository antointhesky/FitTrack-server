export async function seed(knex) {
  await knex("workouts").del();
  await knex("workouts").insert([
    {
      id: 1,
      name: "Cardio",
      description: "Boost your cardiovascular fitness",
      imageUrl: "/images/cardio.jpg",
    },
    {
      id: 2,
      name: "Strength",
      description: "Build muscle and strength",
      imageUrl: "/images/strength.jpg",
    },
    {
      id: 3,
      name: "Fat Burning",
      description: "Lose fat with intense workouts",
      imageUrl: "/images/fat_burning.jpg",
    },
    {
      id: 4,
      name: "Low Impact",
      description: "General wellness exercises",
      imageUrl: "/images/low_intensity.jpg",
    },
  ]);
}
