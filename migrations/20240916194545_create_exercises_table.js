export function up(knex) {
  return knex.schema.createTable("exercises", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("body_part").notNullable();
    table.string("workout_type").notNullable();
    table.string("video_url");
    table.integer("sets").notNullable();
    table.integer("reps").notNullable();
    table.time("duration").notNullable();
    table.integer("calories_burned").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("exercises");
}
