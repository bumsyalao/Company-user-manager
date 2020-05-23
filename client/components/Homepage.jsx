import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import CompanyForm from './CompanyForm';

class Homepage extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <NavigationBar />
        <Switch>
          <Route
            path={`${this.props.match.url}/create-company`}
            component={CompanyForm}
          />
        </Switch>
      </div>
    );
  }
}

export default Homepage