import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRequest, requestResponse } from '../actions/companyActions';

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllRequest();
  }

  onRequestResponse = (event) => {
    event.preventDefault();
    const companyId = this.props.companies.userCompany.companyId
    const userId = event.target.id;
    const status = event.target.value;
    console.log('====status', status)
    this.props.requestResponse(userId, companyId, status);
  }

  renderUserCard = (request) => {
    return (
      <div className="user-card" key={request.id}>
        <div className="profile-info">
          <div>{request.username}</div>
          <div>{request.email}</div>
        </div>
        {request.status === 'new' ?
          <div className="user-profile-btn">
            <button className="ignore-btn" value="ignore" id={request.userId} onClick={this.onRequestResponse}>Ignore</button>
            <button className="accept-btn" value="accept" id={request.userId} onClick={this.onRequestResponse}>Accept</button>
          </div> : ''
        }

      </div>
    )
  }
  render() {
    const { user } = this.props.user;
    const { userCompany, requestList } = this.props.companies;
    return (
      <section>
        <div className="company-profile">
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
            {requestList.map(request => {
              return request.status === 'ignore' ?
                '' : this.renderUserCard(request)
            })}
          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth,
  companies: state.companies
});
export default connect(mapStateToProps, { getAllRequest, requestResponse })(withRouter(CompanyProfile));