import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { create } from '../../../actions/ClientActions';

/**
 * Контроллер для управления диалогом вывода клиента
 */
class OClientEditDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_CLIENT_EDIT, '', widget, create);
  }
}

export default new OClientEditDlg();
