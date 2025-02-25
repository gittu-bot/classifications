document.addEventListener("DOMContentLoaded", function () {
    alert("Welcome to the Regression in Machine Learning Page!");

    // Sample regression data (House Size vs. Price)
    const dataPoints = [
        { x: 500, y: 150000 },
        { x: 700, y: 180000 },
        { x: 1000, y: 250000 },
        { x: 1200, y: 280000 },
        { x: 1500, y: 350000 }
    ];

    // Get canvas element
    const ctx = document.getElementById('regressionChart').getContext('2d');

    // Create scatter plot
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'House Size vs. Price',
                data: dataPoints,
                backgroundColor: 'blue'
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'House Size (sq ft)' } },
                y: { title: { display: true, text: 'Price ($)' } }
            }
        }
    });
});

// Quiz Function
function checkAnswer(question, answer) {
    let correctAnswers = {
        1: "Linear Regression",
        2: "Predicting house prices"
    };

    let resultId = "result" + question;
    let resultElement = document.getElementById(resultId);

    if (correctAnswers[question] === answer) {
        resultElement.innerHTML = "✅ Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.innerHTML = "❌ Try again.";
        resultElement.style.color = "red";
    }
}
