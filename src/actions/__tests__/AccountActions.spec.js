import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../AccountActions';
// import employees from '../../fixtures/employees.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('AccountActions', () => {
  it('refresh', () => {
    const accounts = [
      { n: 0, name: 'NAME_0' },
      { 1: 0, name: 'NAME_1' },
    ];
    const clients = [
      { n: 0, name: 'NAME_0' },
      { 1: 0, name: 'NAME_1' },
    ];
    const state = {
      account: {
        accounts: [],
        clients: [],
        params: {
          name: '',
        },
      },
    };
    const store = mockStore({ ...state });

    nock(URL_SERVER)
      .get('/account/')
      .query(true)
      .reply(200, { accounts: [...accounts] });

    nock(URL_SERVER)
      .get('/client/')
      .query(true)
      .reply(200, { clients: [...clients] });

    return store.dispatch(actions.refresh())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions.length).toBe(2);
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_CLIENTS_FOR_ACCOUNT);
        expect(actualActions[0].payload.clients).toEqual(clients);
        expect(actualActions[1].type).toEqual(CONST_ACTION.REFRESH_ACCOUNTS);
        expect(actualActions[1].payload.accounts).toEqual(accounts);
      });
  });
});
