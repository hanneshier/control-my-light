const router = (app) => {
  app.get("/", (request, response) => {
    response.send({
      message: "Node.js and Express REST API",
    });
  });
  app.get("/color", (request, response) => {
    response.send(color);
  });
};

const color = {
  r: 1,
  g: 2,
  b: 3,
};

// Export the router
module.exports = router;
