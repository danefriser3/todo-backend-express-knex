/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * id: Primary key
name: Full name of the user
email: Unique identifier
password_hash: Encrypted password
created_at: Timestamp
updated_at: Timestamp

 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
