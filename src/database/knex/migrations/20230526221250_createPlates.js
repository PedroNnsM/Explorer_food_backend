exports.up = (knex) =>
  knex.schema.createTable("plates", (table) => {
    table.increments("id");
    table.string("img");
    table.string("title");
    table.string("type");
    table.string("description");
    table.string("ingredients");
    table.string("price");
  });

exports.down = (knex) => knex.schema.dropTable("plates");
