import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { create } from '../../../actions/OperationActions';

/**
 * Контроллер для управления диалогом вывода счета
 */
class OOperationEditDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_OPERATION_EDIT, '', widget, create);
  }
}

export default new OOperationEditDlg();
