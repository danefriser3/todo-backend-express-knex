/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * id: Primary key
task_id: Foreign key to Tasks
user_id: Foreign key to Users
content: Text of the comment
created_at: Timestamp

 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary(); // Primary key
    table.integer("task_id").unsigned().notNullable(); // Foreign key to Tasks
    table.integer("user_id").unsigned().notNullable(); // Foreign key to Users
    table.text("content").notNullable(); // Text of the comment
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
