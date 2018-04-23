import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { DialogContainer, TextField, Button, SelectField } from 'react-md';
import AWidgetDlg from '../AWidgetDlg';

/*
 Диалог для создания нового счета
 */
class AccountEditDlg extends AWidgetDlg {
   static propTypes = {
     fnOk: PropTypes.func.isRequired,
   };

  state = {
    visible: true,
    client: {
      id: 0,
      name: '',
    },
  };

  save=() => {
    this.props.actions.fnOk({
      name: this.fieldName.value,
      balance: this.fieldBalance.value,
      client: this.state.client,
    });
    this.handleCancel();
  }

  setClient=(clientName) => {
    console.log(clientName);
    const client = find(this.props.clients, { name: clientName });
    console.log(client);
    this.setState({ client });
  };


  render() {
    const actions = [];
    actions.push({ secondary: true, children: 'Отмена', onClick: this.handleCancel });
    actions.push(<Button flat primary onClick={this.save}>Сохранить</Button>);
    return (
      <DialogContainer
        id='account-edit-dialog'
        visible={this.state.visible}
        onHide={this.handleCancel}
        actions={actions}
        title='Новый счет для клиента'
      >
        <SelectField
          id='menuClient'
          label='Выберите клиента'
          menuItems={this.props.clients}
          value={this.state.client.name}
          onChange={this.setClient}
          itemLabel='name'
          itemValue='name'
          helpOnFocus
          helpText='Выберите клиента'
          className='md-full-width'
        />
        <TextField
          id='account-edit-dialog-name'
          label='Назначение счета'
          defaultValue=''
          ref={(field) => { this.fieldName = field; }}
        />
        <TextField
          id='account-edit-dialog-balance'
          label='Баланс'
          defaultValue='0'
          type='number'
          ref={(field) => { this.fieldBalance = field; }}
        />
      </DialogContainer>
    );
  }
}

AccountEditDlg.propTypes = {
  modalType: PropTypes.string.isRequired,
};

export default AccountEditDlg;

