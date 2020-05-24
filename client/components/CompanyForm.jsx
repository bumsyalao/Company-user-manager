import React from 'react';

class CompanyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      companyName: '',
      companySize: '',
      companyType: '',
      industry: '',

    }
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  onSizeChange = (e) => {
    this.setState({ companySize: e.target.value });
  }

  render() {
    return (
      <div className="company-form">
        <form>
          <div className="form-group row">
            <label for="companyName" className="col-sm-6 col-form-label">Company Name</label>
            <div className="col-sm-12">
              <input value={this.state.companyName} onChange={this.onChange} type="companyname" className="form-control" id="companyName" />
            </div>
          </div>
          <div className="form-group row">
            <label for="industry" className="col-sm-6 col-form-label">Select Industry</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={this.onChange} id="industry">
                <option value="" disabled selected></option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Management">Management</option>
                <option value="Science and Technology">Science and Technology</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="companyType" className="col-sm-6 col-form-label">Select company type</label>
            <div className="col-sm-12">
              <select className="form-control" id="companyType" onChange={this.onChange}>
                <option value="" disabled selected></option>
                <option value="Public Company">Public Company</option>
                <option value="Private Company">Private Company</option>
                <option value="LLC">LLC</option>
              </select>
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-6 pt-0">Select company size</legend>
              <div className="col-sm-12 form-check">
                <div className="form-check" onChange={this.onSizeChange}>
                  <input className="form-check-input" type="radio" name="gridRadios" value="less than 10" />
                  <label className="form-check-label" for="companySize">less than 10</label>
                </div>
                <div className="form-check" onChange={this.onSizeChange}>
                  <input className="form-check-input" type="radio" name="gridRadios" value="10 - 50" />
                  <label className="form-check-label" for="gridRadios2">10 - 50</label>
                </div>
                <div className="form-check" onChange={this.onSizeChange}>
                  <input className="form-check-input" type="radio" name="gridRadios" value="greater than 50" />
                  <label className="form-check-label" for="gridRadios2">greater than 50</label>
                </div>
              </div>
            </div>
          </fieldset>
          <button className="col-sm-12" type="submit" >Submit</button>
        </form>
      </div>
    )
  }
}

export default CompanyForm;