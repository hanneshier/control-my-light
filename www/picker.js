var colorPicker = new iro.ColorPicker("#picker");

colorPicker.on("input:end", function (color) {
  // log the current color as a HEX string
  console.log(color.rgb);
  const data = color.rgb;

  fetch("/color", {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

});

