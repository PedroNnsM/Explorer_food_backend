exports.up = (knex) =>
  knex.schema.createTable("plates", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("ingredients");
    table.text("ingredients");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("notes");
