const knex = require("./connection.js");
const bcrypt = require("bcrypt");

async function create(
  project_id,
  title,
  description,
  status,
  assignee_id,
  due_date
) {
  const [newTaks] = await knex("tasks")
    .insert({ project_id, title, description, status, assignee_id, due_date })
    .returning("*");
  return newTaks;
}

async function updateById(id, updatedTask) {
  const [task] = await knex("tasks")
    .where({ id })
    .update(updatedTask, [
      "id",
      "title",
      "status",
      "assignee_id",
      "due_date",
      "updated_at",
    ]);
  return task;
}
async function getTaskByID(id) {
  const [task] = await knex("tasks").where({ id }).returning("*");
  return task;
}

module.exports = {
  create,
  updateById,
  getTaskByID,
};
