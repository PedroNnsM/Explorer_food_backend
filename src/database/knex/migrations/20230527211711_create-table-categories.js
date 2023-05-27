exports.up = (knex) =>
  knex.schema.createTable("categories", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("categories");
