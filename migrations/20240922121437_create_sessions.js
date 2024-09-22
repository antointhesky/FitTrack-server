export function up(knex) {
    return knex.schema.createTable("sessions", (table) => {
      table.bigIncrements("id").primary(); // Unique session ID
      table.datetime("date").notNullable(); // When the session took place
      table.integer("calories_burned").defaultTo(0); // Total calories burned during the session
      table.time("duration").defaultTo("00:00:00"); // Total duration of the session
      table.timestamp("created_at").defaultTo(knex.fn.now()); // When the session was created
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")); // Automatically update the timestamp
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable("sessions");
  }
  
