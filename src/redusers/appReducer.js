import { CONST_ACTION } from '../constants';

const initialState = {
  progress: false,
};

const appReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.PROGRESS_SHOW:
      return { ...state, progress: true };
    case CONST_ACTION.PROGRESS_HIDE:
      return { ...state, progress: false };
    default:
      return state;
  }
};

export default appReducer;
