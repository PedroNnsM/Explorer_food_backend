exports.up = (knex) =>
  knex.schema.createTable("dishes_ingredients", (table) => {
    table.increments("id");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table
      .integer("ingredient_id")
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("dishes_ingredients");
