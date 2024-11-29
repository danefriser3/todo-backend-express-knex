const _ = require("lodash");
const tasks = require("../database/tasks-queries.js");

async function createTask(req, res) {
  const { project_id, title, description, status, assignee_id, due_date } =
    req.body;
  const task = await tasks.create(
    project_id,
    title,
    description,
    status,
    assignee_id,
    due_date
  );
  res.send(task);
}

async function updateTask(req, res) {
  const { id } = req.params;
  const { updateTask } = req.body;
  const task = await tasks.updateById(id, updateTask);
  res.send(task);
}

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

async function getTaskByID(req, res) {
  const { id } = req.params;
  const task = await tasks.getTaskByID(id);
  res.send(task);
}

const toExport = {
  createTask: {
    method: createTask,
    errorMessage: "Could not create the task",
  },
  updateTask: {
    method: updateTask,
    errorMessage: "Could not update the task",
  },
  getTaskByID: {
    method: getTaskByID,
    errorMessage: "Could not get the task",
  },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
