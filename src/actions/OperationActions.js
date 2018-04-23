import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/operation/`, data: {} })
    .then(json =>
      soFetch.get({ url: `${URL_SERVER}/client/`, data: {} })
        .then((jsonClients) => {
          dispatch({
            type: CONST_ACTION.REFRESH_CLIENTS_FOR_OPERATION,
            payload: {
              clients: [...jsonClients.clients],
            },
          });
          dispatch({
            type: CONST_ACTION.REFRESH_OPERATIONS,
            payload: {
              operations: [...json.operations],
            },
          });
        }))
    .catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const find = function (name) {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/operation/`, data: { name } })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_OPERATIONS,
        payload: {
          operations: [...json.operations],
          params: {
            name,
          },
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (operation) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/operation/${operation.id}/`, data: {} })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (operation) {
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/operation/${operation.id}`, data: { ...operation } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const create = function (operation) {
  console.log('operation');
  console.log(operation);
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/operation/`, data: { ...operation } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

