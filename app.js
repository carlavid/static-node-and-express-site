const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

/**
 * Set up routes
 */

/* GET index page */
app.get("/", (req, res) => {
    res.render("index", { projects });
})

/* GET about page */
app.get("/about", (req, res) => {
    res.render("about");
})

/* GET project page */
app.get("/projects/:id", (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
        res.render("project", { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Oops! It looks like the project you requested does not exist.";
        next(err);
    }
})

/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    res.status(404).render("page-not-found");
})

/* Global error handler */
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).render("page-not-found", { err });
    } else {
        err.message = "Sorry! It looks like something went wrong on the server." || err.message;
        err.status = 500 || err.status;
        res.render("error", { err });
    }
})

/* Create server */
app.listen(3000);


