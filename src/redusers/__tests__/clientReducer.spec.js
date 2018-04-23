import clientReducer from '../clientReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  clients: [],
  params: {
    name: '',
  },
};

describe('clientReducer', () => {
  it('default init', () => {
    expect(clientReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('REFRESH_CLIENTS', () => {
    const clients = [{ n: 1, name: 'NAME_1' }];

    const newState = clientReducer(
      defaultState,
      {
        type: CONST_ACTION.REFRESH_CLIENTS,
        payload: {
          clients,
          params: {
            name: '',
          },
        },
      },
    );
    expect(newState.clients).toEqual(clients);
  });
});
