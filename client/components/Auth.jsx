import React from 'react';

class Auth extends React.Component {
  constructor() {
    super();
    this.formRef = null;
    // this.formRef = React.createRef();
    this.state = {
      username: '',
      email: '',
      passowrd: '',
      show: true
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  setFormRef = (element) => {
    this.formRef = element;
  }

  toggleDisplay = (event) => {
    event.preventDefault();
    if (this.formRef) {
      const node = this.formRef;
      if (node.style.display !== 'none') {
        node.style.display = "none";
      }
      else if (node.style.display == 'none') {
        node.style.display = "block";
      }
    }


  }
  render() {
    return (
      <div className="auth-form">
        <div className={this.state.show} id="signin-form" ref={this.setFormRef}>
          <div className="form__header">
            <h2>Sign In</h2>
            <small class="form-text text-muted">Don't have an account? <a onClick={this.toggleDisplay}>Sign Up</a></small>
          </div>
          <form id="signin-form">
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.onChange} aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div id="signup-form" className="signup-form" ref={this.setFormRef}>
          <div className="form__header">
            <h2>Sign Up</h2>
            <small class="form-text text-muted">Already have an account? <a onClick={this.toggleDisplay}>Sign In</a></small>
          </div>
          <form>
            <div className="form-group">
              <label for="Username">Username</label>
              <input type="username" className="form-control" id="username" value={this.state.username} onChange={this.onChange} aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.onChange} aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
