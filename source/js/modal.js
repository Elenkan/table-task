import { renderChart, tableContent } from './pageChart.js';
import { renderStroke, changeInputValue, patternDate } from './renderData.js';

const modal = document.querySelector('.modal');
const openButton = document.querySelector('.page-table__button');
const modalForm = modal.querySelector('form');
const closeButton = modal.querySelector('.modal__button');
const date = modalForm.querySelector('.modal-form__input--date');
const name = modalForm.querySelector('.modal-form__input--company');
const price = modalForm.querySelector('.modal-form__input--price');
const modalInputs = modalForm.querySelectorAll('input');

openButton.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modalForm.reset();
});

date.addEventListener('change', () => {
  if (!date.value.match(patternDate)) {
    date.classList.add('error');
    date.setCustomValidity('Внесите данные в формате: ДД.ММ.ГГГГ');

  } else {
    date.classList.remove('error');
    date.setCustomValidity('');
  }
});

modalForm.addEventListener('submit', (event) => {
  event.preventDefault();

  tableContent.insertAdjacentHTML('beforeend', renderStroke(date.value, name.value, price.value));

  renderChart();
  changeInputValue();
  modalForm.reset();
  modal.style.display = 'none';
});
