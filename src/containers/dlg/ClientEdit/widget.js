import React from 'react';
import PropTypes from 'prop-types';
import { DialogContainer, TextField, Button } from 'react-md';
import AWidgetDlg from '../AWidgetDlg';

/*
 Диалог ввода клиента
 */
class ClientEditDlg extends AWidgetDlg {
   static propTypes = {
     fnOk: PropTypes.func.isRequired,
   };

   state={
     visible: true,
   }
  save=() => {
    this.props.actions.fnOk({ name: this.fieldName.value, phone: this.fieldPhone.value });
    this.handleCancel();
  }

  render() {
    const actions = [];
    actions.push({ secondary: true, children: 'Отмена', onClick: this.handleCancel });
    actions.push(<Button flat primary onClick={this.save}>Сохранить</Button>);
    return (
      <DialogContainer
        id='client-edit-dialog'
        visible={this.state.visible}
        onHide={this.handleCancel}
        actions={actions}
        title='Данные клиента'
      >
        <TextField
          id='client-edit-dialog-name'
          label='Имя клиента'
          defaultValue=''
          ref={(field) => { this.fieldName = field; }}
        />
        <TextField
          id='client-edit-dialog-phone'
          label='Телефон'
          defaultValue=''
          ref={(field) => { this.fieldPhone = field; }}
        />
      </DialogContainer>
    );
  }
}

ClientEditDlg.propTypes = {
  modalType: PropTypes.string.isRequired,
};

export default ClientEditDlg;

