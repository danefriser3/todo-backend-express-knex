const _ = require("lodash");
const projects = require("../database/projects-queries.js");

async function createProject(req, res) {
  const { name, description, organization_id } = req.body;
  const project = await projects.create(name, description, organization_id);
  res.send(project);
}

async function getProjectByID(req, res) {
  const { id } = req.params;
  const project = await projects.getProjectByID(id);
  res.send(project);
}

const toExport = {
  createProject: {
    method: createProject,
    errorMessage: "Could not create the project",
  },
  getProjectByID: {
    method: getProjectByID,
    errorMessage: "Could not get the project",
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
