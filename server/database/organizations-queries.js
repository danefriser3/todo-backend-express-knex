const knex = require("./connection.js");
const bcrypt = require("bcrypt");

async function create(name) {
  const [newOrganization] = await knex("organizations")
    .insert({ name })
    .returning("*");
  return newOrganization;
}
async function getOrgById(id) {
  const [organization] = await knex("organizations")
    .where({ id })
    .returning("*");

  return organization;
}
module.exports = {
  create,
  getOrgById,
};
