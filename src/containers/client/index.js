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
  EditDialogColumn,
  FontIcon,
} from 'react-md';

import * as ClientActions from '../../actions/ClientActions';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClient: {},
    };
  }

  componentDidMount() {
    this.props.actions.client.find('');
  }

  remove=(client) => {
    this.props.actions.client.remove(client);
  }

  setSelectedClient=(client) => {
    this.setState({ selectedClient: { ...client } });
  }

  saveName=(value) => {
    const client = this.state.selectedClient;
    client.name = value;
    this.props.actions.client.save(client);
  }

  savePhone=(value) => {
    const client = this.state.selectedClient;
    client.phone = value;
    this.props.actions.client.save(client);
  }

  getRows=() => {
    const rows = this.props.clients.map(client => (
      <TableRow
        key={`client-row-${client.id}`}
      >
        <EditDialogColumn
          id={`field_client_name${client.id}`}
          label='Имя'
          adjusted={false}
          className='md-text--theme-primary md-pointer--hover '
          tooltipLabel='Изменить'
          defaultValue={client.name}
          onChange={() => (this.setSelectedClient(client))}
          onOkClick={this.saveName}
        />
        <EditDialogColumn
          id={`field_client_phone${client.id}`}
          label='Телефон'
          adjusted={false}
          className='md-text--theme-primary md-pointer--hover '
          tooltipLabel='Изменить'
          defaultValue={client.phone}
          onChange={() => (this.setSelectedClient(client))}
          onOkClick={this.savePhone}
        />
        <TableColumn
          id={`field_btn_delete_client${client.id}`}
          adjusted={false}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          onClick={() => this.remove(client)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>

      </TableRow>
    ));
    return rows;
  }

  render() {
    return (
      <DataTable
        baseId='table-clients'
        responsive
        className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
        plain
      >
        <TableHeader>
          <TableRow>
            <TableColumn adjusted={false}>Имя</TableColumn>
            <TableColumn adjusted={false}>Телефон</TableColumn>
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
  return { ...state.client };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: { client: bindActionCreators(ClientActions, dispatch) },
  };
};


ClientPage.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    client: PropTypes.shape({
      find: PropTypes.func.isRequired,
      refresh: PropTypes.func.isRequired,
      save: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const ConnectedClientPage = connect(mapStateToProps, mapDispatchToProps)(ClientPage);
export { ClientPage, ConnectedClientPage };
