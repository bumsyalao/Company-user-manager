import React from 'react';
import { connect } from 'react-redux';
import { getAllCompany, joinCompany } from '../actions/companyActions';

class CompanySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  componentDidMount() {
    this.props.getAllCompany();
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSearch = (e) => {
    e.preventDefault();
    const search = this.state.search
    this.props.getAllCompany(search);
  }

  onJoinCompany = (event, company) => {
    event.preventDefault();
    this.props.joinCompany(company.id);
  }
  render() {
    const { allCompany, userCompany } = this.props.companies;
    return (
      <section className="company-search">
        <div className="header">
          <form onSubmit={this.onSearch}>
            <input value={this.state.search} id="search" onChange={this.onChange} required />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div className="content">
          <div className="content-header">
            <h4>Companies</h4>
            <span>{allCompany.length} {'companies'}</span>
          </div>
          {allCompany.map(company => {
            return (
              <div className="company-card" key={company.id}>
                <div className="profile-info">
                  <div>{company.companyName}</div>
                </div>
                {company.id !== userCompany.companyId &&
                  <button onClick={(e) => this.onJoinCompany(e, company)}>Join company</button>}
              </div>
            )
          })
          }
        </div>
      </section >
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
})


export default connect(mapStateToProps, { getAllCompany, joinCompany })(CompanySearch);