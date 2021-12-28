const pickColor = document.querySelector("#pickColor");
const glassContainer = document.querySelector(".glassContainer");
const blurValueRangeInput = document.querySelector("#blurValueRangeInput");
const transpInput = document.querySelector("#transparencyRangeInput");
const blurValue = document.querySelector(".blurValue");
const transValue = document.querySelector(".transValue");
const generatedCSS = document.querySelector("#generatedCSS");
const allInput = document.querySelectorAll(".settings input");
const outlineBox = allInput[2];

const picker = new Picker({
  parent: pickColor,
  popup: "top",
  color: "rgb(255, 255, 255)",
  format: "rgb",
});

blurValueRangeInput.addEventListener("input", (e) => {
  updateBlur(e);
  updateCSSWithInput(e);
});

transpInput.addEventListener("input", (e) => {
  updateTrans(e);
  updateCSSWithInput(e);
});

pickColor.addEventListener("click", (e) => {
  updateColor(e);
  updateCSSWithInput(e);
});

outlineBox.addEventListener("change", (e) => {
  updateOutline(e);
  updateCSSWithInput(e);
});

const updateCSSWithInput = () => {
  const blurValue = allInput[0].value;
  const transValue = allInput[1].value;
  const transValueFormatted = transValue / 100;
  const colorBackground = window.getComputedStyle(pickColor).backgroundColor;
  const rgbValue = chroma(colorBackground).rgb();

  if (outlineBox.checked) {
    generatedCSS.value = `background: rgba(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}, ${transValueFormatted});\nbox-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\nbackdrop-filter: blur(${blurValue}px);\n-webkit-backdrop-filter: blur(${blurValue}px);\nborder-radius: 10px;\nborder: 1px solid rgba(255, 255, 255, 0.18);`;
  } else {
    generatedCSS.value = `background: rgba(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}, ${transValueFormatted});\nbox-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\nbackdrop-filter: blur(${blurValue}px);\n-webkit-backdrop-filter: blur(${blurValue}px);\nborder-radius: 10px;\n`;
  }
}

const updateTrans = (e) => {
  const value = e.target.value / 100;
  transValue.innerText = value;

  const colorBackground = window.getComputedStyle(pickColor).backgroundColor;
  const rgbValue = chroma(colorBackground).rgb();

  glassContainer.style.background = `rgba(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}, ${value})`;
}

const updateBlur = (e) => {
  const value = e.target.value;
  blurValue.innerText = value;
  glassContainer.style.backdropFilter = `blur(${value}px)`;
  glassContainer.style.webkitBackdropFilter = `blur(${value}px)`;
}

const updateColor = () => {
  picker.onChange = (color) => {
    pickColor.style.background = color.rgbaString;
  };

  const colorBackground = window.getComputedStyle(pickColor).backgroundColor;
  const rgbaValue = chroma(colorBackground).rgba();

  glassContainer.style.background = `rgba(${rgbaValue[0]}, ${rgbaValue[1]}, ${rgbaValue[2]}, ${transValue.innerText})`;
}

const updateOutline = () => {
  glassContainer.classList.toggle("isOutlined");
}

let copyButton = document.querySelector(".copy-css");
let buttonText = document.querySelector(".tick");

buttonText.innerHTML = "Copy To Clipboard";

const tickMark =
  '<svg width="28" height="22.5" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/></svg>';

copyButton.addEventListener("click", () => {
  buttonText.innerHTML = tickMark;
  setTimeout(() => {
    buttonText.innerHTML = "Copy to Clipboard";
  }, 1000);
});

copyButton.addEventListener("click", () => {
  setTimeout(() => {
    const el = document.createElement("textarea");
    document.body.appendChild(el);
    el.value = generatedCSS.value;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }, 400);
});
