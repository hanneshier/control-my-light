const path = require("path");

// initial rgba value
let color = {
  r: 255,
  g: 255,
  b: 255,
  // alpha to 0-255, because home assistant uses that as brightness
  a: 255,
};

const router = (app) => {
  // respond with rgba value to get request
  app.get("/color", (request, response) => {
    response.send(color);
  });

  // Update the rgba value with put request
  app.put("/color", (request, response) => {
    let req = request.body;

    // Parse rgb value:
    // check if integer, fall back to old value
    // use modulus to ensure valid rgb value
    color.r = Number.isInteger(req.r) ? parseInt(req.r) % 256 : color.r;
    color.g = Number.isInteger(req.g) ? parseInt(req.g) % 256 : color.g;
    color.b = Number.isInteger(req.b) ? parseInt(req.b) % 256 : color.b;
    // multiply alpha value (0-1) to be between 0 - 255, since home assistant uses that as brightness value
    color.a = !isNaN(req.a) ? parseInt(parseFloat(req.a) * 255) % 256 : color.a;

    response.send("Updated color");
  });

  // serve homepage (with color picker)
  app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + "/www/index.html"));
  });
  // serve all files inside www folder
  app.get("/:file", (request, response) => {
    const file = request.params.file;
    response.sendFile(path.join(__dirname + "/www/" + file));
  });
};

// Export the router
module.exports = router;
