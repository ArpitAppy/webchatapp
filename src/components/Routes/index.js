import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login';
import { home, login } from './paths';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => (
    <Switch>
        <Route
            exact
            path={login.pathname}
            render={(props) => <Login {...props} />}
        />
        <PrivateRoutes exact path={home.pathname} component={home.component} />
    </Switch>
);

export default Routes;