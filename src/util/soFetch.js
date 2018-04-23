import fetch from 'isomorphic-fetch';

/**
 * Утилита получения запроса
 * Пример использования:
 * var soFetch = require('./soFetch');
 * soFetch.get({ url: 'https://sumpin', data: {  } })
 * .then(response => console.log(response.json()));
 */

const getQueryString = function (params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};


const request = function (params) {
  const method = params.method || 'GET';
  let qs = '';
  let body;
  const headers = params.headers || {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  };

  if (['GET', 'DELETE'].indexOf(method) > -1) {
    qs = `?${getQueryString(params.data)}`;
  } else {
    body = JSON.stringify(params.data);
  }

  const url = params.url + qs;
  return fetch(url, { method, headers, body })
    .then(response => response.json())
    .then((json) => {
      if (json.error !== undefined) {
        throw new Error(json.error);
      } else {
        return json;
      }
    });
};

export default {
  get: params => request(Object.assign({ method: 'GET' }, params)),
  post: params => request(Object.assign({ method: 'POST' }, params)),
  put: params => request(Object.assign({ method: 'PUT' }, params)),
  delete: params => request(Object.assign({ method: 'DELETE' }, params)),
};
