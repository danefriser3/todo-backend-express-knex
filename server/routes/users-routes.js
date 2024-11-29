const _ = require("lodash");
const users = require("../database/users-queries.js");

async function registerUser(req, res) {
  const { email, password_hash, name } = req.body;
  const user = await users.register(name, email, password_hash);
  res.send(user);
}

async function loginUser(req, res) {
  const { email, password_hash } = req.body;
  const user = await users.login(email, password_hash);
  res.send(user);
}

async function getUser(req, res) {
  const user = await users.getUserById(req.params.id);
  res.send(user);
}

const toExport = {
  registerUser: {
    method: registerUser,
    errorMessage: "Could not register the user",
  },
  loginUser: {
    method: loginUser,
    errorMessage: "Could not log in the user",
  },
  getUser: {
    method: getUser,
    errorMessage: "Could not get the user",
  },
};
function addErrorReporting(func, message) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log(`${message} caused by: ${err}`);

      // Not always 500, but for simplicity's sake.
      res.status(500).send(`Opps! ${message}.`);
    }
  };
}
for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
