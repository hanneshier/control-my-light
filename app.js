// Require packages and set the port
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes/routes");

const port = 80;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

routes(app);

// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
