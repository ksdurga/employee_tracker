var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM employees;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { employees: data });
  });
});

app.post("/api/employees", function(req, res) {
  connection.query("INSERT INTO employees SET ?", [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new employee
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a movie
app.put("/api/employees/:id", function(req, res) {
  connection.query("UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?", [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a movie
app.delete("/api/employees/:id", function(req, res) {
  connection.query("DELETE FROM employees WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});