const app = require("./server-config.js");
const routes = require("./server-routes.js");
const userRoutes = require("./routes/users-routes.js");
const organizationRoutes = require("./routes/organizations-routes.js");

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

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
