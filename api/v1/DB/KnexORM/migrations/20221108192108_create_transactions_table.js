/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (t) => {
    t.string("id").defaultTo(null);
    t.string("user_uid").notNullable();
    t.string("authorization_url");
    t.string("access_code");
    t.string("reference").notNullable().primary();
    t.integer("amount");
    t.string("currency").defaultTo("NGN");
    t.string("transaction_type"); //transfer, deposit, withdrawal
    t.string("recipient").defaultTo(null);
    t.string("status").defaultTo("pending");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("transactions");
};
