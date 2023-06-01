exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.float("price").notNullable();
    table.enu("category", ["meal", "drinks", "dessert"]).notNullable();
    table.text("img").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
