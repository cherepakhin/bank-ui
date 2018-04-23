import { showMessage } from './ErrorActions';
import { CONST_ACTION, URL_SERVER } from '../constants';
import soFetch from '../util/soFetch';


export const refresh = function () {
  return (dispatch, getState) => {
    const name = getState().client.params.name;
    let data = {};
    if (name !== undefined && name !== '') {
      data = { name };
    }
    return soFetch.get({ url: `${URL_SERVER}/client/`, data })
      .then((json) => {
        dispatch({
          type: CONST_ACTION.REFRESH_CLIENTS,
          payload: {
            clients: [...json.clients],
            params: {
              name,
            },
          },
        });
      }).catch((ex) => {
        showMessage(dispatch, ex.message);
      });
  };
};

export const find = function (name) {
  return dispatch => soFetch.get({ url: `${URL_SERVER}/client/`, data: { name } })
    .then((json) => {
      dispatch({
        type: CONST_ACTION.REFRESH_CLIENTS,
        payload: {
          clients: [...json.clients],
          params: {
            name,
          },
        },
      });
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const remove = function (client) {
  return (dispatch, getState) => soFetch.delete({ url: `${URL_SERVER}/client/${client.id}/`, data: {} })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const save = function (client) {
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/client/${client.id}`, data: { ...client } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

export const create = function (client) {
  console.log('client');
  console.log(client);
  return (dispatch, getState) => soFetch.post({ url: `${URL_SERVER}/client/`, data: { ...client } })
    .then(() => {
      refresh()(dispatch, getState);
    }).catch((ex) => {
      showMessage(dispatch, ex.message);
    });
};

