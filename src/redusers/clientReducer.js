import { CONST_ACTION } from '../constants';


const initialState = {
  clients: [],
  params: {
    name: '',
  },

};


const clientReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.REFRESH_CLIENTS: {
      return {
        ...state,
        clients: action.payload.clients,
        params: action.payload.params,
      };
    }
    default:
      return state;
  }
};

export default clientReducer;
