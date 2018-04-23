import clientToolBar from '../client/toolbar';
import accountToolBar from '../account/toolbar';
import operationToolBar from '../operation/toolbar';

/**
 * Создание toolbar по текущему пути и state
 * @param  {string} pathname путь
 * @param  {object} state
 * @return {{actions,childs}} массивы элементов элеме для создания toolbar
 */
export default function (pathname, state) {
  if (state === undefined) {
    return {
      actions: [],
      childs: [],
    };
  }
  switch (pathname) {
    case '/client':
      return clientToolBar.getActionsAndChilds(state);
    case '/account':
      return accountToolBar.getActionsAndChilds(state);
    case '/operation':
      return operationToolBar.getActionsAndChilds(state);
    default:
      return clientToolBar.getActionsAndChilds(state);
  }
}
