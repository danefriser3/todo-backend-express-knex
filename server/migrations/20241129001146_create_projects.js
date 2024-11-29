/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/**
 * id: Primary key
organization_id: Foreign key to Organizations
name: Project name
description: Optional
created_at: Timestamp
updated_at: Timestamp
} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("id").primary(); // Primary key
    table.integer("organization_id").unsigned().notNullable(); // Foreign key to Organizations
    table.string("name").notNullable(); // Project name
    table.string("description"); // Optional
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("projects"); // Drops the projects table
};
