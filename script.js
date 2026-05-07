const ctx = document.getElementById('plChart');

async function loadData() {

  const response = await fetch('/.netlify/functions/notion');

  const data = await response.json();

  const labels = [];
  const profitData = [];
  const lossData = [];

  let totalProfit = 0;
  let totalLoss = 0;

  data.results.forEach(item => {

    const properties = item.properties;

    const date = properties.Date.title[0]?.plain_text || 'Day';

    const profit = properties.Profit.number || 0;

    const loss = properties.Loss.number || 0;

    labels.push(date);
    profitData.push(profit);
    lossData.push(loss);

    totalProfit += profit;
    totalLoss += loss;
  });

  document.getElementById('profitValue').innerText = `+$${totalProfit}`;
  document.getElementById('lossValue').innerText = `-$${totalLoss}`;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Profit',
          data: profitData,
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34,197,94,0.15)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Loss',
          data: lossData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.12)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255,255,255,0.08)'
          }
        },
        y: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255,255,255,0.08)'
          }
        }
      }
    }
  });
}

loadData();
