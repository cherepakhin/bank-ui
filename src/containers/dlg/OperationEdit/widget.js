import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { DialogContainer, TextField, Button, SelectField } from 'react-md';
import AWidgetDlg from '../AWidgetDlg';
import soFetch from '../../../util/soFetch';
import { URL_SERVER } from '../../../constants';

/*
 Диалог для создания нового счета
 */
class OperationEditDlg extends AWidgetDlg {
   static propTypes = {
     fnOk: PropTypes.func.isRequired,
   };

  state = {
    visible: true,
    srcClient: {
      id: 0,
      name: '',
    },
    srcAccounts: [],
    srcAccount: {
      name: '',
    },
    dstClient: {
      id: 0,
      name: '',
    },
    dstAccounts: [],
    dstAccount: {
      name: '',
    },
  };

  save=() => {
    this.props.actions.fnOk({
      srcAccount: this.state.srcAccount,
      dstAccount: this.state.dstAccount,
      amount: this.fieldAmount.value,
    });
    this.handleCancel();
  }

  setSrcClient=(clientName) => {
    console.log(clientName);
    const srcClient = find(this.props.clients, { name: clientName });
    console.log(srcClient);
    soFetch.get({ url: `${URL_SERVER}/account/`, data: { name_client: clientName } })
      .then(json => this.setState({ srcClient, srcAccounts: [...json.accounts] }));
  };

  setDstClient=(clientName) => {
    console.log(clientName);
    const dstClient = find(this.props.clients, { name: clientName });
    console.log(dstClient);
    soFetch.get({ url: `${URL_SERVER}/account/`, data: { name_client: clientName } })
      .then(json => this.setState({ dstClient, dstAccounts: [...json.accounts] }));
  };

  setSrcAccount=(srcAccountName) => {
    const srcAccount = find(this.state.srcAccounts, { name: srcAccountName });
    this.setState({ srcAccount });
  }

  setDstAccount=(dstAccountName) => {
    const dstAccount = find(this.state.dstAccounts, { name: dstAccountName });
    this.setState({ dstAccount });
  }

  render() {
    const actions = [];
    actions.push({ secondary: true, children: 'Отмена', onClick: this.handleCancel });
    actions.push(<Button flat primary onClick={this.save}>Сохранить</Button>);
    return (
      <DialogContainer
        id='operation-edit-dialog'
        visible={this.state.visible}
        onHide={this.handleCancel}
        actions={actions}
        title='Новыя операция'
      >
        <SelectField
          id='menu-src-client'
          label='Отправитель'
          menuItems={this.props.clients}
          value={this.state.srcClient.name}
          onChange={this.setSrcClient}
          itemLabel='name'
          itemValue='name'
          helpOnFocus
          helpText='Выберите клиента'
          className='md-full-width'
        />
        <SelectField
          id='menu-src-account'
          label='Счет отправителя'
          menuItems={this.state.srcAccounts}
          value={this.state.srcAccount.name}
          onChange={this.setSrcAccount}
          itemLabel='name'
          itemValue='name'
          helpOnFocus
          helpText='Выберите счет отправителя'
          className='md-full-width'
        />
        <SelectField
          id='menu-dst-client'
          label='Получатель'
          menuItems={this.props.clients}
          value={this.state.dstClient.name}
          onChange={this.setDstClient}
          itemLabel='name'
          itemValue='name'
          helpOnFocus
          helpText='Выберите клиента'
          className='md-full-width'
        />
        <SelectField
          id='menu-dst-account'
          label='Счет отправителя'
          menuItems={this.state.dstAccounts}
          value={this.state.dstAccount.name}
          onChange={this.setDstAccount}
          itemLabel='name'
          itemValue='name'
          helpOnFocus
          helpText='Выберите счет отправителя'
          className='md-full-width'
        />
        <TextField
          id='operation-edit-dialog-balance'
          label='Сумма'
          defaultValue='0'
          type='number'
          ref={(field) => { this.fieldAmount = field; }}
        />
      </DialogContainer>
    );
  }
}

OperationEditDlg.propTypes = {
  modalType: PropTypes.string.isRequired,
};

export default OperationEditDlg;

