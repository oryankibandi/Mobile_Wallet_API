/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wallets", (t) => {
    t.string("wallet_uid").primary().unique();
    t.string("user_uid");
    t.string("public_key");
    t.string("encrypted_private_key");
    t.integer("balance");
    t.json("initialization_vector");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("wallets");
};
