export function up(knex) {
  return knex.schema.createTable("session_exercises", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("session_id").unsigned().notNullable();
    table.bigInteger("exercise_id").unsigned().notNullable();
    table.string("workout_type").notNullable();
    table.integer("count").notNullable();
    table.foreign("session_id").references("id").inTable("sessions").onDelete("CASCADE");
    table.foreign("exercise_id").references("id").inTable("exercises").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("session_exercises");
}
