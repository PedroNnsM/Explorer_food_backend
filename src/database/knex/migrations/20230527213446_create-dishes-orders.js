exports.up = (knex) =>
  knex.schema.createTable("dishes_orders", (table) => {
    table.increments("id");
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("dishes_orders");
