"use strict";
let colorPicker;
let defaultColor = "#00f973";
//When page loads, function start
window.addEventListener("load", start);
//Start functions, that displays the default values
function start() {
  colorPicker = document.querySelector("#picker");
  colorPicker.value = defaultColor;
  document.querySelector(".colorHex").innerHTML = colorPicker.value;
  document.querySelector(".colorRgb").innerHTML = hexToRgb(colorPicker.value);
  document.querySelector(".colorHsl").innerHTML = RgbToHsl(colorPicker.value);
  colorPicker.addEventListener("input", showColor);
}
//Showing updated colors,HEX,RGB AND HSL
function showColor() {
  let colorValue = document.querySelector("#picker").value;
  document.querySelector(".selectedColor").style.background = colorValue;
  console.log(colorValue);
  showHex(colorValue);
  showRgb(colorValue);
  showHsl(colorValue);
}
function showHex(color) {
  document.querySelector(".colorHex").innerHTML = color;
}
function showRgb(color) {
  document.querySelector(".colorRgb").innerHTML = hexToRgb(color);
}
function showHsl(color) {
  document.querySelector(".colorHsl").innerHTML = RgbToHsl(color);
}
//Convert HEX to RGB
function hexToRgb(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return "RGB(" + +r + "," + +g + "," + +b + ")";
}
//Convert RGB to HSL
function RgbToHsl(H) {
  //Convert to RGB first because I could not use the results from the function above
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  //Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  //Find the greatest and smallest values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "HSL(" + h + "%," + s + "%," + l + "%)";
}
