import Chart from 'chart.js';

const tableContent = document.querySelector('tbody');
const chart = document.getElementById('dataChart');
let pageChart = null;

const getArray = (searchPlace, className) => {
  return Array.from(searchPlace.querySelectorAll(className)).map((item) => item.value);
};

const renderChart = (dates = getArray(tableContent, '.table__date-input'),
  prices = getArray(tableContent, '.table__price-input'),
  names = getArray(tableContent, '.table__company-input')) => {

  if (pageChart != null) {
    pageChart.destroy();
  }

  pageChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        data: prices,
        backgroundColor: '#344163'
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: true,
        callbacks: {
          title: function(tooltipItem, data) {
            return names[tooltipItem[0].index];

          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const updateChart = (chart, input) => {
  if (chart != null) {
    if (input.classList.contains('table__date-input')) {
      chart.data.labels.push(input.value);
    }
    if (input.classList.contains('table__price-input')) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(input.value);
      });
    }
    chart.update();
  }
};

export { tableContent, renderChart, updateChart };
