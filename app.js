const express = require("express");
const app = express();

app.set("view engine", "pug");

/**
 * Set up routes
 */

// create root route 
app.get("/", (req, res) => {
    res.render("index");
})

// create route to "about" page
app.get("/about", (req, res) => {
    res.render("about");
})

// create dynamic "project" routes
app.get("/project", (req, res) => {
    res.render("project");
})

// create server
app.listen(3000);


