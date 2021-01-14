const path = require("path");

let color = {
  r: 1,
  g: 2,
  b: 3,
};

const router = (app) => {
  //implememt color picker here
  app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + "/../www/index.html"));
  });
  //serve files inside www folder
  app.get("/:file", (request, response) => {
    const file = request.params.file;
    response.sendFile(path.join(__dirname + "/../www/" + file));
  });

  // respond with rgb value
  app.get("/color", (request, response) => {
    response.send(color);
  });

  // Update the rgb value
  app.put("/color", (request, response) => {
    let req = request.body;
    console.log(req);

    color.r = parseInt(req.r) ? parseInt(req.r) % 256 : color.r;
    color.g = parseInt(req.g) ? parseInt(req.g) % 256 : color.g;
    color.b = parseInt(req.b) ? parseInt(req.b) % 256 : color.b;

    response.send("Updated the color");
  });
};

// Export the router
module.exports = router;
