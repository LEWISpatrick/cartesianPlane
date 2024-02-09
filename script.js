  document.getElementById('plotButton').addEventListener('click', function plotPoints() {
    const canvas = document.getElementById('cartesianPlane');
    const ctx = canvas.getContext('2d');
    const width = canvas.width; // Corrected typo here
    const height = canvas.height;
    const unit = 20;

    // ... rest of your code ...

  var errorLog = document.getElementById('errorLog'); // Make sure 'errorLog' matches the ID in your HTML
  var x = parseFloat(document.getElementById('xInput').value); // Gets the value and converts to a float
  var y = parseFloat(document.getElementById('yInput').value); // Gets the value and converts to a float

    function plotPoint(x, y) {
      // Convert Cartesian coordinates to Canvas coordinates
      const canvasX = width / 2 + x * unit;
      const canvasY = height / 2 - y * unit;

      console.log("Canvas coordinates:", canvasX, canvasY); // For debugging

      // ... rest of the plotPoint function ...
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, Math.PI * 2); // A point is a small circle
    ctx.fill();
    console.log("plotPoint")
  }
  

  console.log(x);
  console.log(y);


  if (!isNaN(x) && !isNaN(y)) {
    plotPoint(x, y); // Calls the function to plot the point
  } else {
    errorLog.innerHTML = 'Please input a valid number for both x and y'; // Displays error message
  }



});

// This should be outside the click event listener so it's only drawn once
function drawPlane() {
  const canvas = document.getElementById('cartesianPlane');
  const ctx = canvas.getContext('2d');
  const width = canvas.width; // Corrected typo here
  const height = canvas.height;

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  // Draw x-axis
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  // Draw y-axis
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  console.log("Plane drawn");
}

// Call drawPlane when the page loads to draw the Cartesian plane
drawPlane();


// Function to plot the graph of a function
function plotGraph(func) {
    const canvas = document.getElementById('cartesianPlane');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const unit = 20; // Scale for your units
    const errorLog = document.getElementById('errorLog')
    // Loop over a range of x values to plot the function
    for (let x = -width / 2; x < width / 2; x += 1) {
        let y;
        try {
            // Dynamically evaluate the function using the 'eval' function
            y = eval(func.replace(/x/g, `(${x / unit})`)); // Replace 'x' with the current x value (scaled)
        } catch (error) {
          errorLog.innerHtml("Error evaluating function:", error);
            return;
        }

        // Convert the function output (y) to canvas coordinates and plot
        const canvasX = width / 2 + x;
        const canvasY = height / 2 - y * unit;

        // Plot a small rectangle (or point) for each calculated coordinate
        ctx.fillStyle = 'blue';
        ctx.fillRect(canvasX, canvasY, 2, 2); // Plotting a 2x2 rectangle for visibility
    }
}

// Add event listener for the 'Plot Function' button
document.getElementById('plotFunctionButton').addEventListener('click', function() {
    const funcInput = document.getElementById('functionInput').value;
    if (funcInput) {
        // Clear the canvas and redraw the plane
        drawPlane();
        plotGraph(funcInput);
    } else {
        document.getElementById('errorLog').innerHTML = 'Please input a valid function';
    }
});
