import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    {/* <Route path="/homepage" component={Homepage} /> */}
    {/* <Route component={PageNotFound} /> */}
  </Switch>
);

export default Routes;
