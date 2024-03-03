// Convert pattern string to array of integers
function parsePattern(patternString) {
  const patternArray = [];
  const patternWithoutSpaces = patternString.replace(/\s/g, ''); // Menghapus spasi
  for (let i = 0; i < patternWithoutSpaces.length; i++) {
    patternArray.push(parseInt(patternWithoutSpaces[i]));
  }
  return patternArray;
}

// Generate pattern based on user input
function generatePattern() {
  const patternInput = document.getElementById("patternInput").value;
  const pattern = parsePattern(patternInput);
  generateImage(pattern);
}

// Download image
function downloadImage() {
  const canvas = document.getElementById("patternCanvas");
  const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  const link = document.createElement("a");
  link.setAttribute("href", image);
  link.setAttribute("download", "pattern.png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Clear canvas
function clearCanvas() {
  const canvas = document.getElementById("patternCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Generate pattern data
const defaultPattern = [
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1
];

// Convert pattern data to 16x16 pixel image
function generateImage(pattern) {
  clearCanvas(); // Menghapus gambar sebelumnya

  const canvas = document.getElementById("patternCanvas");
  const ctx = canvas.getContext("2d");

  const pixelSize = canvas.width / 16;

  // Menggambar kotak kota piksel
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Menggambar pola piksel
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      ctx.fillStyle = pattern[i * 16 + j] === 1 ? "black" : "white";
      ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
    }
  }
}

generateImage(defaultPattern);

  const textareaSize = document.querySelector("#patternInput");
  textareaSize.addEventListener("keyup", e => {
    textareaSize.style.height = "33.5px";
    let height = e.target.scrollHeight;
    textareaSize.style.height = (height + "px");
  });
