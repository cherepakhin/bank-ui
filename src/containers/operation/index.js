import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  FontIcon,
} from 'react-md';
import { formatDate } from '../../util';
import * as OperationActions from '../../actions/OperationActions';

class OperationPage extends React.Component {
  componentDidMount() {
    this.props.actions.operation.refresh('');
  }

  getRows=() => {
    const rows = this.props.operations.map(operation => (
      <TableRow
        key={`operation-row-${operation.id}`}
      >
        <TableColumn
          id={`field_operation_ddate_${operation.id}`}
          adjusted={false}
        >{formatDate(operation.ddate)}
        </TableColumn>

        <TableColumn
          id={`field_operation_src_client_${operation.id}`}
          adjusted={false}
        >{operation.srcAccount.client.name}
        </TableColumn>
        <TableColumn
          id={`field_operation_src_account_${operation.id}`}
          adjusted={false}
        >{operation.srcAccount.name}
        </TableColumn>

        <TableColumn
          id={`field_operation_dst_client_${operation.id}`}
          adjusted={false}
        >{operation.dstAccount.client.name}
        </TableColumn>
        <TableColumn
          id={`field_operation_src_account_${operation.id}`}
          adjusted={false}
        >{operation.dstAccount.name}
        </TableColumn>

        <TableColumn
          id={`field_operation_amount_${operation.id}`}
          adjusted={false}
          numeric
        >{operation.amount}
        </TableColumn>
        <TableColumn
          id={`field_btn_delete_operation${operation.id}`}
          adjusted={false}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          onClick={() => this.remove(operation)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>

      </TableRow>
    ));
    return rows;
  }

  remove=(operation) => {
    this.props.actions.operation.remove(operation);
  }

  render() {
    return (
      <DataTable
        baseId='table-operations'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableColumn adjusted={false}>Дата</TableColumn>
            <TableColumn adjusted={false}>Отправитель</TableColumn>
            <TableColumn adjusted={false}>С счета</TableColumn>
            <TableColumn adjusted={false}>Получатель</TableColumn>
            <TableColumn adjusted={false}>На счет</TableColumn>
            <TableColumn
              adjusted={false}
              numeric
            >Сумма
            </TableColumn>
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
  return { ...state.operation };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: { operation: bindActionCreators(OperationActions, dispatch) },
  };
};


OperationPage.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    operation: PropTypes.shape({
      find: PropTypes.func.isRequired,
      refresh: PropTypes.func.isRequired,
      save: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const ConnectedOperationPage = connect(mapStateToProps, mapDispatchToProps)(OperationPage);
export { OperationPage, ConnectedOperationPage };
