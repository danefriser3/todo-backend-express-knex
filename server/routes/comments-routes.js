const _ = require("lodash");
const comments = require("../database/comments-queries.js");

async function addComment(req, res) {
  const { task_id, user_id, content } = req.body;
  const comment = await comments.create(task_id, user_id, content);
  res.send(comment);
}

async function getAllCommentsByTaskId(req, res) {
  const { task_id } = req.params;
  const commentList = await comments.getAllCommentsForTask(task_id);
  res.send(commentList);
}

const toExport = {
  addComment: {
    method: addComment,
    errorMessage: "Could not create the comment",
  },
  getAllCommentsByTaskId: {
    method: getAllCommentsByTaskId,
    errorMessage: "Could not get the comment list",
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
