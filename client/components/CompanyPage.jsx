import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRequestTable = ({ username }) => {
    return (
      <div>
        <div>{username}</div>
        <button></button>
        <button></button>
      </div>
    )
  }

  renderUserCard = () => {
    return (
      <div className="user-card">
        <div className="profile-info">
          <div>test@email.com</div>
          <div>username</div>
          <span>new</span>
        </div>
        <div className="user-profile-btn">
          <button clasName="green">Accept</button>
          <button className="red">Decline</button>
        </div>

      </div>
    )
  }
  render() {
    const { user } = this.props.user;
    const { userCompany } = this.props.companies;
    return (
      <section>
        <div className="company-page">
          <div className="header-content">
            <h3>{userCompany.companyName}</h3>
            <div className="header-details">
              <span>Email: <p>{user.email}</p></span>
              <span>Company Type: <p> {userCompany.companyType}</p></span>
              <span>Company Size: <p>{userCompany.companySize}</p></span>
              <span>Company Industry: <p>{userCompany.industry}</p></span>
            </div>
          </div>
          <div>
            {this.renderUserCard()}
          </div>
          {/* <div className="request-btn">
            <button>VIEW REQUEST</button>
          </div> */}

        </div>
      </section>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth,
  companies: state.companies
});
export default connect(mapStateToProps, null)(withRouter(CompanyPage));