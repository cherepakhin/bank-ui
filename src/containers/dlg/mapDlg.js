import messageError from './MessageError';
import clientEdit from './ClientEdit';
import accountEdit from './AccountEdit';
import operationEdit from './OperationEdit';

/**
 * Map для связи типа диалога с контроллером диалога
 * @type {{}}
 */
const mapDlg = new Map();

mapDlg.set(messageError.typeDlg, messageError);
mapDlg.set(clientEdit.typeDlg, clientEdit);
mapDlg.set(accountEdit.typeDlg, accountEdit);
mapDlg.set(operationEdit.typeDlg, operationEdit);
export default mapDlg;

