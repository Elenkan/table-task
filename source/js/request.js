import { renderStrokes } from './renderData.js';

const requestURL = 'https://api.coinlore.net/api/coin/markets/?id=90';

const sendRequest = (url) => {
  return fetch(url).then(response => {
    return response.json();
  })
};

sendRequest(requestURL)
  .then(data => {
    renderStrokes(data);
  })
  .catch(err => console.log(err));
