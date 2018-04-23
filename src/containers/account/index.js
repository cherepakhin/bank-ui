import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  EditDialogColumn,
  FontIcon,
} from 'react-md';

import * as AccountActions from '../../actions/AccountActions';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: {},
    };
  }

  componentDidMount() {
    this.props.actions.account.refresh();
  }

  remove=(account) => {
    this.props.actions.account.remove(account);
  }

  setSelectedAccount=(account) => {
    this.setState({ selectedAccount: { ...account } });
  }

  saveName=(value) => {
    const account = this.state.selectedAccount;
    account.name = value;
    this.props.actions.account.save(account);
  }

  getRows=() => {
    const rows = this.props.accounts.map(account => (
      <TableRow
        key={`account-row-${account.id}`}
      >
        <TableColumn
          id={`field_account_client_name_${account.id}`}
          adjusted={false}
        >{account.client.name}
        </TableColumn>

        <EditDialogColumn
          id={`field_account_name_${account.id}`}
          label='Назначение счета'
          adjusted={false}
          className='md-text--theme-primary md-pointer--hover '
          tooltipLabel='Изменить'
          defaultValue={account.name}
          onChange={() => (this.setSelectedAccount(account))}
          onOkClick={this.saveName}
        />
        <TableColumn
          id={`field_account_balance_${account.id}`}
          adjusted={false}
          numeric
        >{account.balance}
        </TableColumn>

        <TableColumn
          id={`field_btn_delete_account${account.id}`}
          adjusted={false}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          onClick={() => this.remove(account)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>

      </TableRow>
    ));
    return rows;
  }

  render() {
    return (
      <DataTable
        baseId='table-accounts'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableColumn adjusted={false}>Клиент</TableColumn>
            <TableColumn adjusted={false}>Назначение счета</TableColumn>
            <TableColumn adjusted={false}>Баланс</TableColumn>
            <TableColumn adjusted={false} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getRows()}
        </TableBody>
      </DataTable>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.account };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: { account: bindActionCreators(AccountActions, dispatch) },
  };
};


AccountPage.propTypes = {
  accounts: PropTypes.arrayOf(shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    balance: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.shape({
    account: PropTypes.shape({
      find: PropTypes.func.isRequired,
      refresh: PropTypes.func.isRequired,
      save: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const ConnectedAccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPage);
export { AccountPage, ConnectedAccountPage };
