import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { create } from '../../../actions/AccountActions';

/**
 * Контроллер для управления диалогом вывода счета
 */
class OAccountEditDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_ACCOUNT_EDIT, '', widget, create);
  }
}

export default new OAccountEditDlg();
