// KNN Visualization
const knnCanvas = document.getElementById('knnCanvas');
const knnCtx = knnCanvas.getContext('2d');

const points = [];
let k = 3; // Default number of neighbors

knnCanvas.addEventListener('click', (event) => {
  const rect = knnCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Add a new point (label alternates between 0 and 1)
  const label = points.filter(p => p.label !== null).length % 2;
  points.push({ x, y, label });
  drawPoints();
});

function drawPoints() {
  knnCtx.clearRect(0, 0, knnCanvas.width, knnCanvas.height);
  points.forEach(point => {
    knnCtx.beginPath();
    knnCtx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    knnCtx.fillStyle = point.label === 1 ? 'blue' : 'red';
    knnCtx.fill();
  });
}

function classifyWithKNN() {
  k = parseInt(document.getElementById('kValue').value);
  points.forEach(point => {
    if (point.label === null) {
      const distances = points
        .filter(p => p.label !== null)
        .map(p => ({
          ...p,
          distance: Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2)
        }));
      distances.sort((a, b) => a.distance - b.distance);
      const neighbors = distances.slice(0, k);
      const labels = neighbors.map(n => n.label);
      point.label = labels.reduce((a, b) => a + b, 0) > k / 2 ? 1 : 0;
    }
  });
  drawPoints();
}

function resetKNN() {
  points.length = 0;
  drawPoints();
}

// Logistic Regression Visualization
const lrCanvas = document.getElementById('lrCanvas');
const lrCtx = lrCanvas.getContext('2d');

const lrPoints = [];
let lrWeights = [0, 0]; // [weightX, weightY]
let lrBias = 0;

lrCanvas.addEventListener('click', (event) => {
  const rect = lrCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Add a new point (label alternates between 0 and 1)
  const label = lrPoints.filter(p => p.label !== null).length % 2;
  lrPoints.push({ x, y, label });
  drawLRPoints();
});

function drawLRPoints() {
  lrCtx.clearRect(0, 0, lrCanvas.width, lrCanvas.height);
  lrPoints.forEach(point => {
    lrCtx.beginPath();
    lrCtx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    lrCtx.fillStyle = point.label === 1 ? 'blue' : 'red';
    lrCtx.fill();
  });
}

function trainLogisticRegression() {
  // Simple gradient descent for logistic regression
  const learningRate = 0.01;
  for (let i = 0; i < 1000; i++) {
    lrPoints.forEach(point => {
      const z = lrWeights[0] * point.x + lrWeights[1] * point.y + lrBias;
      const prediction = 1 / (1 + Math.exp(-z));
      const error = point.label - prediction;
      lrWeights[0] += learningRate * error * point.x;
      lrWeights[1] += learningRate * error * point.y;
      lrBias += learningRate * error;
    });
  }
  drawLRDecisionBoundary();
}

function drawLRDecisionBoundary() {
  const x0 = 0;
  const y0 = (-lrWeights[0] * x0 - lrBias) / lrWeights[1];
  const x1 = lrCanvas.width;
  const y1 = (-lrWeights[0] * x1 - lrBias) / lrWeights[1];

  lrCtx.beginPath();
  lrCtx.moveTo(x0, y0);
  lrCtx.lineTo(x1, y1);
  lrCtx.strokeStyle = 'green';
  lrCtx.stroke();
}

function resetLR() {
  lrPoints.length = 0;
  lrWeights = [0, 0];
  lrBias = 0;
  drawLRPoints();
}