export function up(knex) {
    return knex.schema.createTable("goals", (table) => {
      table.increments("id").primary();                      
      table.string("name").notNullable();                    
      table.integer("target").notNullable();                 
      table.integer("current_progress").defaultTo(0);        
      table.date("deadline").notNullable();                  
      table.timestamp("created_at").defaultTo(knex.fn.now()); 
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")); 
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable("goals");
  }
  