/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * user_id: Foreign key to Users
organization_id: Foreign key to Organizations
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_organizations", (table) => {
    table.integer("user_id").unsigned().notNullable(); // Foreign key to Users
    table.integer("organization_id").unsigned().notNullable(); // Foreign key to Organizations
    table.primary(["user_id", "organization_id"]); // Composite primary key
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
