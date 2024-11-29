const _ = require("lodash");
const organizations = require("../database/organizations-queries.js");

async function createOrganization(req, res) {
  const { name } = req.body;
  const organization = await organizations.create(name);
  res.send(organization);
}

async function getOrgById(req, res) {
  const { id } = req.params;
  const organization = await organizations.getOrgById(id);
  res.send(organization);
}

const toExport = {
  createOrganization: {
    method: createOrganization,
    errorMessage: "Could not create the organization",
  },
  getOrgById: {
    method: getOrgById,
    errorMessage: "Could not get the organization",
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
