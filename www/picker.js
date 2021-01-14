var colorPicker = new iro.ColorPicker("#picker");

colorPicker.on("color:change", function (color) {
  // log the current color as a HEX string
  console.log(color.rgb);
});
