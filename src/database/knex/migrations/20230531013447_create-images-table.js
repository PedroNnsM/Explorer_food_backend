exports.up = (knex) =>
  knex.schema.createTable("images", (table) => {
    table.increments("id");
    table.string('filename').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("images");