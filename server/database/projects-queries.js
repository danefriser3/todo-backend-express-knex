const knex = require("./connection.js");
const bcrypt = require("bcrypt");

async function create(name, description, organization_id) {
  const org = await knex("organizations")
    .where({ id: organization_id })
    .first();
  if (!org) {
    return null;
  }
  const [newProject] = await knex("projects")
    .insert({ name, description, organization_id })
    .returning("*");
  return newProject;
}

async function getProjectByID(id) {
  const [project] = await knex("projects").where({ id }).returning("*");
  return project;
}

module.exports = {
  create,
  getProjectByID,
};
