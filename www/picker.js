// init iro color picker
// for documentation and options see https://iro.js.org/guide.html
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

// put new rgba value to server component
colorPicker.on("input:end", function (color) {
  const data = color.rgba;

  fetch("/color", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});
