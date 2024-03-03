function fetchDataAndUpdate() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        const currentPrice = data.ethereum.usd;
        document.getElementById('currentPrice').textContent = `$${currentPrice.toLocaleString()}`; // Adding dollar symbol and formatting
    })
    .catch(error => console.error('Error fetching price data:', error));

    fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(response => response.json())
    .then(data => {
        const marketCap = data.market_data.market_cap.usd;
        document.getElementById('marketCap').textContent = `$${marketCap.toLocaleString()}`; // Adding dollar symbol and formatting
    })
    .catch(error => console.error('Error fetching market cap data:', error));
}

// Update data every 5 seconds
setInterval(fetchDataAndUpdate, 5000);

// Initial data fetch and update
fetchDataAndUpdate();
let chart; // Global variable to hold the chart instance

// Fetch cryptocurrency price data for the specified time range
async function fetchPriceData(days, coin) {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${days}`);
  const data = await response.json();
  return data.prices; // Array of [timestamp, price]
}

// Render the chart with the given price data
function renderChart(timestamps, prices) {
  const ctx = document.getElementById('priceChart').getContext('2d');
  if (chart) {
    chart.destroy(); // Destroy the previous chart instance if exists
  }
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps.map(formatTimestamp),
      datasets: [{
        label: 'Price (USD)',
        data: prices,
        borderColor: 'gold', // Set graph color to gold
        backgroundColor: 'transparent',
        borderWidth: 1 // Adjusted to make the graph line thinner
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'hour',
            tooltipFormat: 'YYYY-MM-DD HH:mm', // Custom tooltip format to display date, hours, and minutes
            displayFormats: {
              hour: 'YYYY-MM-DD HH:mm', // Custom timestamp format to display date, hours, and minutes
              minute: 'YYYY-MM-DD HH:mm' // Custom timestamp format to display date, hours, and minutes
            }
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price (USD)'
          }
        }]
      }
    }
  });
}

// Format timestamp to display only date, hours, and minutes
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Event listeners for the buttons
document.getElementById('btn24hrs').addEventListener('click', async () => {
  const priceData = await fetchPriceData(1, 'ethereum');
  const timestamps = priceData.map(entry => new Date(entry[0]));
  const prices = priceData.map(entry => entry[1]);
  renderChart(timestamps, prices);
});

document.getElementById('btn1week').addEventListener('click', async () => {
  const priceData = await fetchPriceData(7, 'ethereum');
  const timestamps = priceData.map(entry => new Date(entry[0]));
  const prices = priceData.map(entry => entry[1]);
  renderChart(timestamps, prices);
});

document.getElementById('btn1month').addEventListener('click', async () => {
  const priceData = await fetchPriceData(30, 'ethereum');
  const timestamps = priceData.map(entry => new Date(entry[0]));
  const prices = priceData.map(entry => entry[1]);
  renderChart(timestamps, prices);
});

// Initially, render the chart for the last 24 hours
(async () => {
  const priceData = await fetchPriceData(1, 'ethereum');
  const timestamps = priceData.map(entry => new Date(entry[0]));
  const prices = priceData.map(entry => entry[1]);
  renderChart(timestamps, prices);
})();
