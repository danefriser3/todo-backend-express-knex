const app = require("./server-config.js");
const routes = require("./server-routes.js");
const userRoutes = require("./routes/users-routes.js");
const organizationRoutes = require("./routes/organizations-routes.js");
const projectsRoutes = require("./routes/projects-routes.js");
const tasksRoutes = require("./routes/tasks-routes.js");
const commentsRoutes = require("./routes/comments-routes.js");

const port = process.env.PORT || 5000;

app.get("/", routes.getAllTodos);
app.get("/:id", routes.getTodo);

app.post("/", routes.postTodo);
app.patch("/:id", routes.patchTodo);

app.delete("/", routes.deleteAllTodos);
app.delete("/:id", routes.deleteTodo);

app.post("/api/users/register", userRoutes.registerUser);
app.post("/api/users/login", userRoutes.loginUser);
app.get("/api/users/:id", userRoutes.getUser);

app.post("/api/organizations", organizationRoutes.createOrganization);
app.get("/api/organizations/:id", organizationRoutes.getOrgById);

app.post("/api/projects", projectsRoutes.createProject);
app.get("/api/projects/:id", projectsRoutes.getProjectByID);

app.post("/api/tasks", tasksRoutes.createTask);
app.patch("/api/tasks/:id", tasksRoutes.updateTask);
app.get("/api/tasks/:id", tasksRoutes.getTaskByID);

app.post("/api/comments", commentsRoutes.addComment);
app.get("/api/comments/:task_id", commentsRoutes.getAllCommentsByTaskId);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
