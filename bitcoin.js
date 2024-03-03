
function fetchBitcoinDataAndUpdate() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
        const bitcoinPrice = data.bitcoin.usd;
        document.getElementById('bitcoinPrice').textContent = '$' + bitcoinPrice.toLocaleString(); // Displaying Bitcoin price
    })
    .catch(error => console.error('Error fetching Bitcoin price data:', error));
    
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then(response => response.json())
    .then(data => {
        const marketCap = data.market_data.market_cap.usd;
        document.getElementById('bitcoinMarketCap').textContent = '$' + marketCap.toLocaleString(); // Displaying Bitcoin market cap
    })
    .catch(error => console.error('Error fetching Bitcoin market cap data:', error));
    }
    
    // Update Bitcoin data every 5 seconds
    setInterval(fetchBitcoinDataAndUpdate, 5000);
    
    // Initial Bitcoin data fetch and update
    fetchBitcoinDataAndUpdate();
    
    let chart; // Global variable to hold the chart instance
    
        // Fetch cryptocurrency price data for the specified time range
        async function fetchPriceData(days) {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`);
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
              labels: timestamps,
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
    
        // Event listeners for the buttons
        document.getElementById('btn24hrs').addEventListener('click', async () => {
          const priceData = await fetchPriceData(1);
          const timestamps = priceData.map(entry => formatDate(entry[0])); // Format timestamps
          const prices = priceData.map(entry => entry[1]);
          renderChart(timestamps, prices);
        });
    
        document.getElementById('btn1week').addEventListener('click', async () => {
          const priceData = await fetchPriceData(7);
          const timestamps = priceData.map(entry => formatDate(entry[0])); // Format timestamps
          const prices = priceData.map(entry => entry[1]);
          renderChart(timestamps, prices);
        });
    
        document.getElementById('btn1month').addEventListener('click', async () => {
          const priceData = await fetchPriceData(30);
          const timestamps = priceData.map(entry => formatDate(entry[0])); // Format timestamps
          const prices = priceData.map(entry => entry[1]);
          renderChart(timestamps, prices);
        });
    
        // Format timestamp to display only date, hours, and minutes
        function formatDate(timestamp) {
          const date = new Date(timestamp);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}`;

        }
    
        // Initially, render the chart for the last 24 hours
        (async () => {
          const priceData = await fetchPriceData(1);
          const timestamps = priceData.map(entry => formatDate(entry[0])); // Format timestamps
          const prices = priceData.map(entry => entry[1]);
          renderChart(timestamps, prices);
        })();