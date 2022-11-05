/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (t) => {
    t.string("user_uid").primary();
    t.string("first_name");
    t.string("last_name");
    t.string("phone_number");
    t.string("email");
    t.string("id_number");
    t.string("hashed_password");
    t.string("wallet_hash");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("users");
};
