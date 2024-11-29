/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary(); // Primary key
    table.integer("project_id").unsigned().notNullable(); // Foreign key to Projects
    table.string("title").notNullable(); // Task title
    table.string("description"); // Optional
    table.string("status").notNullable(); // Enum (todo, in-progress, done)
    table.integer("assignee_id").unsigned().notNullable(); // Foreign key to Users
    table.date("due_date"); // Optional
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};
/**
 * id: Primary key
project_id: Foreign key to Projects
title: Task title
description: Optional
status: Enum (todo, in-progress, done)
assignee_id: Foreign key to Users
due_date: Optional
created_at: Timestamp
updated_at: Timestamp
 */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.createTable("tasks");
};
