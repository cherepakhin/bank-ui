import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import { CONST_ACTION, URL_SERVER } from '../../constants';
import * as actions from '../ClientActions';
// import employees from '../../fixtures/employees.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('ClientActions', () => {
  it('refresh', () => {
    const clients = [
      { n: 0, name: 'NAME_0' },
      { 1: 0, name: 'NAME_1' },
    ];
    const state = {
      client: {
        clients: [],
        params: {
          name: '',
        },
      },
    };
    const store = mockStore({ ...state });

    nock(URL_SERVER)
      .get('/client/')
      .query(true)
      .reply(200, { clients: [...clients] });

    return store.dispatch(actions.refresh())
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions[0].type).toEqual(CONST_ACTION.REFRESH_CLIENTS);
        expect(actualActions[0].payload.clients).toEqual(clients);
      });
  });
});
