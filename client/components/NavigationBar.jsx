import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { getUserCompany } from '../actions/companyActions';


class NavigationBar extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.user) {
      this.props.getUserCompany();
    }
  }

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  render() {
    const { user } = this.props.user;
    const { userCompany } = this.props.companies;
    return (
      <div className="navigationbar">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Welcome {user.username && user.username.toUpperCase()}</a>
          {userCompany.companyName ?
            <>
              <Link to="/homepage/company-profile">
                <button type="submit">{userCompany.companyName.toUpperCase()}{' '}{'COMPANY'}</button>
              </Link>
              <Link to="/homepage/company-search">
                <button type="submit">Search</button>
              </Link>
            </>
            :
            <Link to="/homepage/create-company">
              <button type="submit">Create your company</button>
            </Link>
          }
          <button onClick={this.logout}>Logout</button>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth,
  companies: state.companies
});

export default connect(mapStateToProps, { logout, getUserCompany })(withRouter(NavigationBar));