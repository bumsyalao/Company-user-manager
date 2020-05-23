import React from 'react';
import { connect } from 'react-redux';
import { userSignInRequest, userSignUpRequest } from '../actions/authActions';
import Alert from './Alerts';
import Alerts from './Alerts';


class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      passowrd: '',
      show: true
    }
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/homepage');
    // }
    // Variables
    const signupButton = document.getElementById('signup-button');
    const signinButton = document.getElementById('signin-button');
    const userForms = document.getElementById('user_options-forms');
    // Add event listener to the "Sign Up" button
    signupButton.addEventListener('click', () => {
      userForms.classList.remove('signin-click');
      userForms.classList.add('signup-click');
    }, false);
    // Add event listener to the "signin" button
    signinButton.addEventListener('click', () => {
      userForms.classList.remove('signup-click');
      userForms.classList.add('signin-click');
    }, false);
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSignIn = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .userSignInRequest(userData)
      .then((res) => {
        console.log('===signin sucess res', res);
        // this.props.history.push('/homepage');
        // this.onRenderAlerts(res.data.message, res.data.status);
      })
      .catch((error) => {
        console.log('=== sigin error', error.response);
        // this.onRenderAlerts(error.response.data.message, error.response.status)
      });
  }

  onSignUp = (event) => {
    event.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .userSignUpRequest(userData)
      .then((res) => {
        console.log('===signup sucess res', res);
        // this.props.history.push('/homepage');
        // this.onRenderAlerts(res.data.message, res.data.status);
      })
      .catch((error) => {
        console.log('=== signup error', error);
        // this.onRenderAlerts(error.response.data.message, error.response.status)
      });
  }

  onRenderAlerts = (message, type) => {
    return (<Alerts message={message} type={type} />);
  }



  render() {
    return (
      <div className="auth-form" id="user_options-forms">
        <div className={this.state.show} id="signin-form">
          <div className="form__header">
            <h2>Sign In</h2>
            <small class="form-text text-muted">Don't have an account? <button id="signup-button">Sign Up</button></small>
          </div>
          <form onSubmit={this.onSignIn}>
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
        <div id="signup-form" className="signup-form">
          <div className="form__header">
            <h2>Sign Up</h2>
            <small class="form-text text-muted">Already have an account? <button id="signin-button">Sign In</button></small>
          </div>
          <form onSubmit={this.onSignUp}>
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

const mapStateToProps = state => ({
  user: state.auth
});
const actions = { userSignUpRequest, userSignInRequest };

export default connect(mapStateToProps, actions)(Auth);
