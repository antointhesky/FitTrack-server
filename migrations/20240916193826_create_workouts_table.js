export function up(knex) {
  return knex.schema.createTable("workouts", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("description");
    table.string("imageUrl");
  });
}

export function down(knex) {
  return knex.schema.dropTable("workouts");
}
