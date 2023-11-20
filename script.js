document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const totalRevenueInput = document.getElementById('totalRevenue');
    const numberOfOrdersInput = document.getElementById('numberOfOrders');
    const calculateAOVButton = document.getElementById('calculate-aov-btn');
    const desiredIncreaseInput = document.getElementById('desiredIncrease');
    const calculateImpactButton = document.getElementById('calculate-revenue-impact-btn');
    const currentAOVOutput = document.getElementById('current-aov-output');
    const revenueImpactOutput = document.getElementById('revenue-impact-output');
    const revenueChartContainer = document.getElementById('revenue-chart-container');

    calculateAOVButton.addEventListener('click', () => {
        calculateCurrentAOV();
        // Pre-fill with 10% increase and automatically calculate the revenue impact
        desiredIncreaseInput.value = '10';
        calculateImpactButton.click(); // Simulate a click on the revenue impact button
    });

    calculateImpactButton.addEventListener('click', calculateRevenueImpact);

    let currentAOV, numberOfOrders;

    function calculateCurrentAOV() {
        const totalRevenue = parseFloat(totalRevenueInput.value);
        numberOfOrders = parseInt(numberOfOrdersInput.value);
        
        if (!isNaN(totalRevenue) && !isNaN(numberOfOrders) && numberOfOrders > 0) {
            currentAOV = (totalRevenue / numberOfOrders).toFixed(2);
            currentAOVOutput.innerHTML = `Your current AOV from ${startDateInput.value} to ${endDateInput.value} is: <strong>$${currentAOV}</strong>`;
            document.getElementById('target-aov-section').style.display = 'block';
        } else {
            currentAOVOutput.textContent = 'Please enter valid revenue and order numbers.';
        }
    }

    function calculateRevenueImpact() {
        const desiredIncrease = parseFloat(desiredIncreaseInput.value);
        if (!isNaN(desiredIncrease) && desiredIncrease > 0) {
            // Ensure currentAOV is calculated before continuing
            if (!currentAOV) {
                alert('Please calculate the current AOV before setting the desired increase.');
                return;
            }

            const targetAOV = currentAOV * (1 + (desiredIncrease / 100));
            const currentRevenue = currentAOV * numberOfOrders;
            const potentialRevenue = targetAOV * numberOfOrders;
            const revenueDifference = potentialRevenue - currentRevenue;
            const dateRangeDays = (new Date(endDateInput.value) - new Date(startDateInput.value)) / (1000 * 60 * 60 * 24);
            const annualRevenueDifference = (revenueDifference * (365 / dateRangeDays)).toFixed(2);

    revenueImpactOutput.innerHTML = `
    Achieving a <strong>${desiredIncrease}%</strong> increase in your Average Order Value could have resulted in an estimated 
    revenue of <strong>$${potentialRevenue.toFixed(2)}</strong>, compared to the actual revenue of 
    <strong>$${currentRevenue.toFixed(2)}</strong>. The difference of <strong>$${revenueDifference.toFixed(2)}</strong> 
    highlights the potential uplift from such an increase.<br><br>
    Projected over a year, a <strong>${desiredIncrease}%</strong> increase in AOV could potentially 
    add up to <strong>$${annualRevenueDifference}</strong> to your revenue.<br><br>
    Interested in realizing these numbers? 
    <a href="mailto:support@theaovmechanic.example.com" class="potatoe">Contact The AOV Mechanic™</a>
`;
 







            // Show the chart container and render chart
            revenueChartContainer.style.display = 'block';
            renderChart(currentRevenue, potentialRevenue);
        } else {
            revenueImpactOutput.textContent = 'Please enter a valid desired AOV increase percentage.';
        }
    }

    function renderChart(currentRevenue, potentialRevenue) {
        const ctx = document.getElementById('revenue-chart').getContext('2d');
        if (window.myBarChart) {
            window.myBarChart.destroy();
        }
        window.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Current Revenue', 'Potential Revenue'],
                datasets: [{
                    label: 'Revenue Comparison',
                    data: [currentRevenue, potentialRevenue],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.2)',
                        'rgba(52, 152, 219, 0.2)'
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Corrected the ID to match the button's ID in the HTML
  document.getElementById('calculate-aov-btn').addEventListener('click', function() {
    var outputDiv = document.getElementById('current-aov-output');
    // This will remove the class 'hidden' if present, or add it if not present
    outputDiv.classList.toggle('hidden');
  });
});

