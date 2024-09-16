export function up(knex) {
  return knex.schema.createTable("workouts", (table) => {
    table.increments("id").primary();
    table.string("workout_name").notNullable();
    table.timestamp("date").defaultTo(knex.fn.now()); // Date the workout was logged
    table.integer("duration").notNullable();
    table.integer("calories_burned").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("workouts");
}
