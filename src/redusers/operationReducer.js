import { CONST_ACTION } from '../constants';


const initialState = {
  operations: [],
  clients: [],
  params: {
    name: '',
  },

};


const operationReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.REFRESH_OPERATIONS: {
      return {
        ...state,
        operations: action.payload.operations,
        params: action.payload.params,
      };
    }
    case CONST_ACTION.REFRESH_CLIENTS_FOR_OPERATION: {
      return {
        ...state,
        clients: action.payload.clients,
      };
    }
    default:
      return state;
  }
};

export default operationReducer;
