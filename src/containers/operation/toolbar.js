import React from 'react';
import Button from 'react-md/lib/Buttons';

import { CONST_ACTION } from '../../constants';

class OperationToolBar {
  constructor() {
    this.props = undefined;
    this.actions = [];
    this.childs = [];
    this.groups = [];
  }

  getActions() {
    return [
      <Button
        key='btn_new_operation'
        icon
        className='md-btn--toolbar'
        tooltipLabel='Новая опреация'
        onClick={() => this.props.actions.openDlg(CONST_ACTION.DLG_OPERATION_EDIT, {
          clients: this.props.operation.clients,
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
      Операции
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

export default new OperationToolBar();
