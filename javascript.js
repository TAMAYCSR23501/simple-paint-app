// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 600;
canvas.height = 400;

// Set the initial circle properties
let startX, startY, endX, endY;
let isDrawing = false;
let circleColor;
let circles = [];

// Add event listeners for mouse events
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    endX = e.offsetX;
    endY = e.offsetY;
    drawCircle();
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('dblclick', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    if (distance(x, y, circle.x, circle.y) < circle.radius) {
      circles.splice(i, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const circle of circles) {
        drawCircle(circle);
      }
      break;
    }
  }
});

canvas.addEventListener('click', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  let hit = false;
  for (const circle of circles) {
    if (distance(x, y, circle.x, circle.y) < circle.radius) {
      hit = true;
      break;
    }
  }
  alert(hit ? 'Hit' : 'Miss');
});

// Add event listener for reset button
document.getElementById('reset-btn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles = [];
});

// Function to draw a circle
function drawCircle(circle) {
  if (!circle) {
    // Calculate the radius of the circle based on the mouse drag distance
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    // Generate a random color for the circle
    circleColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Draw the circle
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = circleColor;
    ctx.fill();

    // Store the circle properties
    circles.push({ x: startX, y: startY, radius, color: circleColor });
  } else {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();
  }
}

// Function to calculate distance between two points
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}