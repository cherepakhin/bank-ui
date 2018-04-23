import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  NavigationDrawer,
  CircularProgress,
} from 'react-md';

import { ConnectedModalRoot } from '../dlg/ModalRoot';
import { ConnectedClientPage } from '../client';
import { ConnectedAccountPage } from '../account';
import { ConnectedOperationPage } from '../operation';

import NavLink from './NavLink';

import { history } from '../../store';
import links from './links';
import buildToolBar from './buildToolBar';
import openDlg from '../../actions/ModalActions';
import * as ClientActions from '../../actions/ClientActions';
import * as AccountActions from '../../actions/AccountActions';
import * as OperationActions from '../../actions/OperationActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getNavItems = this.getNavItems.bind(this);
  }

  getNavItems() {
    const navItems = links;
    return navItems.map(props => <NavLink {...props} key={props.to} />);
  }

  render() {
    const { actions, childs } = buildToolBar(history.location.pathname, this.props);
    const routing = (location => (
      <Switch key={location.key}>
        <Route exact path='/client' location={location} component={ConnectedClientPage} />
        <Route exact path='/account' location={location} component={ConnectedAccountPage} />
        <Route exact path='/operation' location={location} component={ConnectedOperationPage} />
        <Route exact path='/' location={location} component={ConnectedClientPage} />
      </Switch>)
    );
    return (
      <ConnectedRouter history={history}>
        <Route
          render={({ location }) => (
            <NavigationDrawer
              drawerTitle='Банк'
              navItems={this.getNavItems()}
              mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
              tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              toolbarActions={actions}
              toolbarChildren={childs}
            >
              {this.props.app.progress &&
              <CircularProgress
                id='progress'
                key='progress'
                scale={2}
                className='loading'
                centered
              />
              }
              {
                 routing(location)
              }
              <ConnectedModalRoot openDlg={openDlg} />
            </NavigationDrawer>
        )}
        />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: {
      openDlg: bindActionCreators(openDlg, dispatch),
      client: bindActionCreators(ClientActions, dispatch),
      account: bindActionCreators(AccountActions, dispatch),
      operation: bindActionCreators(OperationActions, dispatch),
    },
  };
};

App.propTypes = {
  actions: PropTypes.shape({
    openDlg: PropTypes.func.isRequired,
  }).isRequired,
  app: PropTypes.shape({
    progress: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
