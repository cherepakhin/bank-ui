import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/account/`, data: {} })
    .then(json =>
      soFetch.get({ url: `${URL_SERVER}/client/`, data: {} })
        .then((jsonClients) => {
          dispatch({
            type: CONST_ACTION.REFRESH_CLIENTS_FOR_ACCOUNT,
            payload: {
              clients: [...jsonClients.clients],
            },
          });
          dispatch({
            type: CONST_ACTION.REFRESH_ACCOUNTS,
            payload: {
              accounts: [...json.accounts],
            },
          });
        }))
    .catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const find = function (name) {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/account/`, data: { name } })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_ACCOUNTS,
        payload: {
          accounts: [...json.accounts],
          params: {
            name,
          },
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (account) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/account/${account.id}/`, data: {} })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (account) {
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/account/${account.id}`, data: { ...account } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const create = function (account) {
  console.log('account');
  console.log(account);
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/account/`, data: { ...account } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

