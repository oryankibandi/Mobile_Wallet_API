/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wallets", (t) => {
    t.string("wallet_uid").primary().unique();
    t.string("user_uid");
    t.string("public_key", 256);
    t.string("encrypted_private_key", 640);
    t.integer("balance");
    t.string("currency");
    t.string("initialization_vector");
    t.string("verification_string");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("wallets");
};
