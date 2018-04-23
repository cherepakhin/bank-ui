import { CONST_ACTION } from '../constants';


const initialState = {
  accounts: [],
  clients: [],
  params: {
    name: '',
  },

};


const accountReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.REFRESH_ACCOUNTS: {
      return {
        ...state,
        accounts: action.payload.accounts,
        params: action.payload.params,
      };
    }
    case CONST_ACTION.REFRESH_CLIENTS_FOR_ACCOUNT: {
      return {
        ...state,
        clients: action.payload.clients,
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
