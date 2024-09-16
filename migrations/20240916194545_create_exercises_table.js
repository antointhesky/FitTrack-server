export function up(knex) {
  return knex.schema.createTable("exercises", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.tinyint("sets").notNullable();
    table.tinyint("reps").notNullable();
    table.time("duration").notNullable();
    table.integer("calories_burned").notNullable();
    table
      .bigInteger("workout_id")
      .unsigned()
      .references("id")
      .inTable("workouts")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("exercises");
}
