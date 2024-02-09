document.getElementById('plotButton').addEventListener('click', function plotPoints() {
  const canvas = document.getElementById('cartesianPlane');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const unit = 20;

  var errorLog = document.getElementById('errorLog');
  var x = parseFloat(document.getElementById('xInput').value);
  var y = parseFloat(document.getElementById('yInput').value);

  function plotPoint(x, y) {
    const canvasX = width / 2 + x * unit;
    const canvasY = height / 2 - y * unit;

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!isNaN(x) && !isNaN(y)) {
    plotPoint(x, y);
  } else {
    errorLog.innerHTML = 'Please input a valid number for both x and y';
  }
});

function drawPlane() {
  const canvas = document.getElementById('cartesianPlane');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
}

drawPlane();

function plotGraph(func) {
  const canvas = document.getElementById('cartesianPlane');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const unit = 20;
  const errorLog = document.getElementById('errorLog')
  for (let x = -width / 2; x < width / 2; x += 1) {
    let y;
    try {
      y = eval(func.replace(/x/g, `(${x / unit})`));
    } catch (error) {
      errorLog.innerHtml("Error evaluating function:", error);
      return;
    }

    const canvasX = width / 2 + x;
    const canvasY = height / 2 - y * unit;

    ctx.fillStyle = 'blue';
    ctx.fillRect(canvasX, canvasY, 2, 2);
  }
}

document.getElementById('plotFunctionButton').addEventListener('click', function() {
  const funcInput = document.getElementById('functionInput').value;
  if (funcInput) {
    drawPlane();
    plotGraph(funcInput);
  } else {
    document.getElementById('errorLog').innerHTML = 'Please input a valid function';
  }
});
