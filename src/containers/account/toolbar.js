import React from 'react';
import { Button } from 'react-md';

import { CONST_ACTION } from '../../constants';

class AccountToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
  }

  getActions() {
    return [
      <Button
        key='btn_new_account'
        icon
        className='md-btn--toolbar'
        tooltipLabel='Новый счет'
        onClick={() => this.props.actions.openDlg(CONST_ACTION.DLG_ACCOUNT_EDIT, {
          clients: this.props.account.clients,
        })}
      >
        add
      </Button>,
    ];
  }

  /**
 * Получение элементов ср.части toolbar
 * @param  {object} props - весь state
 * @return {array} - массив элементов toolbar
 */
  getChilds() {
    return [
      <div
        key='label'
        className='md-title--toolbar md-cell--1-offset md-cell--phone-hidden'
      >
      Счета клиентов
      </div>,
    ];
  }

  getActionsAndChilds(_props) {
    this.props = _props;
    this.actions = this.getActions();
    this.childs = this.getChilds();
    return { actions: this.actions, childs: this.childs };
  }
}
export default new AccountToolBar();
