const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use(express.static('public'));

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
app.get("/projects/:id", (req, res) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
        res.render("project", { project });
    } else {
        res.sendStatus(404);
    }
    
})

/* Create server */
app.listen(3000);


