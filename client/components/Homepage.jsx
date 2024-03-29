import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import CompanyForm from './CompanyForm';
import CompanyProfile from './CompanyProfile';
import CompanySearch from './CompanySearch';

class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <NavigationBar />
        <Switch>
          <Route
            path={`${this.props.match.url}/create-company`}
            component={CompanyForm}
          />
          <Route
            path={`${this.props.match.url}/company-profile`}
            component={CompanyProfile}
          />
          <Route
            path={`${this.props.match.url}/company-search`}
            component={CompanySearch}
          />
        </Switch>
      </div>
    );
  }
}

export default Homepage