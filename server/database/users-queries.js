const knex = require("./connection.js");
const bcrypt = require("bcrypt");

async function register(name, email, password_hash) {
  const encrypt = await bcrypt.hash(password_hash, 10);
  const [newUser] = await knex("users")
    .insert({
      email,
      password_hash: encrypt,
      name,
    })
    .returning("*");

  return newUser;
}

async function login(email, password_hash) {
  const [loggedUser] = await knex("users").where({ email }).returning("*");
  const loggable = await bcrypt.compare(
    password_hash,
    loggedUser.password_hash
  );

  if (!loggable) {
    return null;
  }

  return loggedUser;
}

async function getUserById(id) {
  const [user] = await knex("users").where({ id }).returning("*");

  return user;
}

module.exports = {
  register,
  login,
  getUserById,
};
