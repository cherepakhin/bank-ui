import operationReducer from '../operationReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  operations: [],
  clients: [],
  params: {
    name: '',
  },
};

describe('operationReducer', () => {
  it('default init', () => {
    expect(operationReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('REFRESH_OPERATIONS', () => {
    const operations = [{ n: 1, name: 'NAME_1' }];

    const newState = operationReducer(
      defaultState,
      {
        type: CONST_ACTION.REFRESH_OPERATIONS,
        payload: {
          operations,
          params: {
            name: '',
          },
        },
      },
    );
    expect(newState.operations).toEqual(operations);
  });

  it('REFRESH_CLIENTS_FOR_OPERATION', () => {
    const clients = [{ n: 1, name: 'NAME_1' }];

    const newState = operationReducer(
      defaultState,
      {
        type: CONST_ACTION.REFRESH_CLIENTS_FOR_OPERATION,
        payload: {
          clients,
        },
      },
    );
    expect(newState.clients).toEqual(clients);
  });
});
