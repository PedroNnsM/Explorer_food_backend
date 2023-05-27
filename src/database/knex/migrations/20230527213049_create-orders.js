exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.enu("payment_method", ["pix", "credit_card"]).notNullable();
    table
      .enu("status", ["entregue", "preparando", "pendente"])
      .defaultTo("pendente");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");
