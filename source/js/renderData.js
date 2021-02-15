import { tableContent, renderChart, updateChart } from './pageChart.js';

const FIRST_ELEMENT_POSITION = 25;
const LAST_ELEMENT_POSITION = 35;
const MULTIPLIER = 1000;
const MULTIPLIER_FOR_RANDOM = 10000000000;
const MAX_NUMBER = 10;
const patternDate = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;

const getNumberData = (number) => number * MULTIPLIER - (Math.random() * MULTIPLIER_FOR_RANDOM);

const getDateStroke = number => {
  const data = new Date(number);

  return `${data.getDate() < MAX_NUMBER ? `0` + data.getDate() : data.getDate()}` +
    `.${(data.getMonth() + 1) < MAX_NUMBER ? `0` + (data.getMonth() + 1) : (data.getMonth() + 1)}` +
    `.${data.getFullYear()}`;
};

const changeInputValue = () => {
  tableContent.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (event) => {
      input.setAttribute('value', event.target.value);
      updateChart(renderChart(), input);
    });
  });
};

const validateDate = () => {
  tableContent.querySelectorAll('.table__date-input').forEach((item) => {
    item.addEventListener('change', () => {
      if (!item.value.match(patternDate)) {
        item.style.color = '#F2022D';
      } else {
        item.style.color = '#FFF'
      }
    });
  });
};


const renderStroke = (date, name, price) =>
  `<tr class="table__information">
    <td class="table__date">
      <input class="table__date-input" type="text" value="${date}"/>
    </td>
    <td class="table__company">
      <input class="table__company-input" type="text" value="${name}">
    </td>
    <td class="table__price">
      <input class="table__price-input" class="table__price--input" type="number" value="${Math.floor(price)}">
    </td>
  </tr>`;

const renderStrokes = (array) => {
  const arrayData = array.slice(FIRST_ELEMENT_POSITION, LAST_ELEMENT_POSITION)
    .map((item) => {
      return {
        'name': item.name,
        'price_usd': item.price_usd,
        'time': getNumberData(item.time)
      };
    })
    .sort((a, b) => a.time < b.time ? 1 : -1);

  arrayData.forEach(item => tableContent
    .insertAdjacentHTML('afterbegin', renderStroke(getDateStroke(item.time), item.name, item.price_usd)));

  renderChart();
  validateDate();
  changeInputValue();

  document.querySelectorAll('.loading-message').forEach(msg => msg.remove());
};

export { renderStroke, renderStrokes, changeInputValue, patternDate };
