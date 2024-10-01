export function up(knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.bigIncrements("id").primary();
    table.datetime("date").notNullable();
    table.time("duration").defaultTo("00:00:00");
    table.integer("calories_burned").defaultTo(0);
    table.boolean("is_draft").defaultTo(true); 
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(
      knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    );
  });
}

export function down(knex) {
  return knex.schema.dropTable("sessions");
}

