import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import clientReducer from './clientReducer';
import accountReducer from './accountReducer';
import operationReducer from './operationReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  modal: modalReducer,
  client: clientReducer,
  account: accountReducer,
  operation: operationReducer,
});
