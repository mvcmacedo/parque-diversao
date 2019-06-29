import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated, isAdmin } from '../services/auth';

import Home from '../screens/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAdmin() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signin" />
    <Route exact path="/signup" />
    <Route exact path="/validar-passaporte" />
    <PrivateRoute path="/meus-passaportes" component={() => <h1>Oi userrr</h1>} />
    <AdminRoute path="/promocoes" component={() => <h1>Oi admin</h1>} />
    <AdminRoute path="/entradas" component={() => <h1>Oi admin</h1>} />
    <AdminRoute path="/vendas" component={() => <h1>Oi admin</h1>} />
    <AdminRoute path="/usuarios" component={() => <h1>Oi admin</h1>} />
  </Switch>
);

export default Routes;