import accountReducer from '../accountReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  accounts: [],
  clients: [],
  params: {
    name: '',
  },
};

describe('accountReducer', () => {
  it('default init', () => {
    expect(accountReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('REFRESH_ACCOUNTS', () => {
    const accounts = [{ n: 1, name: 'NAME_1' }];

    const newState = accountReducer(
      defaultState,
      {
        type: CONST_ACTION.REFRESH_ACCOUNTS,
        payload: {
          accounts,
          params: {
            name: '',
          },
        },
      },
    );
    expect(newState.accounts).toEqual(accounts);
  });

  it('REFRESH_CLIENTS_FOR_ACCOUNT', () => {
    const clients = [{ n: 1, name: 'NAME_1' }];

    const newState = accountReducer(
      defaultState,
      {
        type: CONST_ACTION.REFRESH_CLIENTS_FOR_ACCOUNT,
        payload: {
          clients,
        },
      },
    );
    expect(newState.clients).toEqual(clients);
  });
});
