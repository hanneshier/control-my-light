var colorPicker = new iro.ColorPicker("#picker", {
  layout: [
    {
      component: iro.ui.Wheel,
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "alpha",
      },
    },
  ],
});

colorPicker.on("input:end", function (color) {
  // log the current color as a HEX string
  console.log(color.rgba);
  const data = color.rgba;

  fetch("/color", {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});
