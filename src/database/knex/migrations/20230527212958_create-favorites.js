exports.up = (knex) =>
  knex.schema.createTable("favorites", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.integer("dish_id").notNullable();
    
  });

exports.down = (knex) => knex.schema.dropTable("favorites");
