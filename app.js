const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

/* GET index page */
app.get("/", (req, res) => {
  res.render("index", { projects });
});

/* GET about page */
app.get("/about", (req, res) => {
  res.render("about");
});

/* GET project page */
app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);

  if (project) {
    res.render("project", { project });
  } else {
    next();
  }
});


/* 404 handler to catch undefined or non-existent project route requests */
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Oops! It looks like the page you requested does not exist.";
  next(err);
});

/* Global error handler */
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message =
    err.message || "Sorry! It looks like something went wrong on the server.";
  console.log(`${err.status}: ${err.message}`);

  // Render different views based on error status
  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    res.status(err.status).render("error", { err });
  }
});

/* Server setup */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
