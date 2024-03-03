// Example data for previous anomaly cases
const barLabels = ['Mt. Gox Hack', 'DAO Hack', 'Bitfinex Hack', 'QuadrigaCX Scandal', 'PlusToken Ponzi Scheme'];
const barData = [850000, 300000, 120000, 115000, 1000000]; // Number of affected users for each case

// Create bar chart
const barChart = new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
        labels: barLabels,
        datasets: [{
            label: 'Number of Affected Users',
            data: barData,
            backgroundColor: ['4bc0c0', '#4bc0c0', '4bc0c0', '#4bc0c0', '4bc0c0'], // Example colors
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false, // Prevent Chart.js from maintaining aspect ratio
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Number of Affected Users in Previous Anomaly Cases'
        }
    }
});
