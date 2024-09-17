export function up(knex) {
  return knex.schema.createTable("goals", (table) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.integer("target").notNullable(); 
    table.string("unit").notNullable();    
    table.string("current_progress").notNullable();
    table.date("deadline_progress").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("goals");
}
