let color = {
  r: 1,
  g: 2,
  b: 3,
};

const router = (app) => {
  //implememt color picker her
  app.get("/", (request, response) => {
    response.send({
      message: "Node.js and Express REST API",
    });
  });

  // respond with rgb value
  app.get("/color", (request, response) => {
    response.send(color);
  });

  // Update the rgb value
  app.put("/color", (request, response) => {
    let req = request.body;
    console.log(req);

    color.r = Number.isInteger(parseInt(req.r))
      ? parseInt(req.r) % 256
      : color.r;
    color.g = Number.isInteger(parseInt(req.g))
      ? parseInt(req.g) % 256
      : color.g;
    color.b = Number.isInteger(parseInt(req.b))
      ? parseInt(req.b) % 256
      : color.b;

    response.send("Updated the color");
  });
};

// Export the router
module.exports = router;
