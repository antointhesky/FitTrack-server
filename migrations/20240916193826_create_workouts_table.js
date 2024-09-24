export function up(knex) {
  return knex.schema.createTable("workouts", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("description");
    table.string("imageUrl");
    table.time("duration").defaultTo("00:00:00");
    table.integer("calories_burned").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("workouts");
}
