export function up(knex) {
    return knex.schema.createTable("exercises", (table) => {
      table.increments("id").primary();                      
      table.string("exercise_name").notNullable();           
      table.integer("sets").notNullable();                   
      table.integer("reps").notNullable();                   
      table.integer("duration").notNullable();               
      table.integer("calories_burned").notNullable();        
      table
        .integer("workout_id")
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
  