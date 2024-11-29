const knex = require("./connection.js");
const bcrypt = require("bcrypt");

async function create(task_id, user_id, content) {
  const user = await knex("users").where("id", user_id).first();
  if (!user) {
    return null;
  }
  const task = await knex("tasks").where("id", task_id).first();
  if (!task) {
    return null;
  }
  const [newComment] = await knex("comments")
    .insert({ task_id, user_id, content })
    .returning("*");
  return newComment;
}

async function getAllCommentsForTask(task_id) {
  const comments = await knex("comments")
    .where("task_id", task_id)
    .returning("*");
  return comments;
}

module.exports = {
  create,
  getAllCommentsForTask,
};
