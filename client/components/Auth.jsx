import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userSignInRequest, userSignUpRequest } from '../actions/authActions';


class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      passowrd: '',
    }
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/homepage');
    // }
    // Variables
    const signupTab = document.getElementById('signup-tab');
    const signinTab = document.getElementById('login-tab');
    const loginForm = document.getElementById('login-tab-content');
    const signupForm = document.getElementById('signup-tab-content')

    signupTab.addEventListener('click', () => {
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
    }, false);
    signinTab.addEventListener('click', () => {
      loginForm.classList.remove('active');
      signupForm.classList.add('active');
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
      .then(() => {
        this.props.history.push('/homepage');
      })
      .catch((error) => {
        throw error;
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
      .then(() => {
        this.props.history.push('/homepage');
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className="auth-form">
        <div className="form-wrap">
          <div className="tabs-content">
            <div id="signup-tab-content" className="active">
              <span id="signup-tab">Already have an account?<a>Click to login</a></span>
              <form className="signup-form" onSubmit={this.onSignUp}>
                <input
                  value={this.state.username}
                  onChange={this.onChange}
                  type="text"
                  className="input"
                  id="username"
                  placeholder="Username"
                  required />
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  className="input"
                  id="email"
                  placeholder="Email"
                  required />
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  className="input"
                  id="password"
                  placeholder="Password"
                  required />
                <input
                  type="submit"
                  className="button"
                  value="Sign Up" />
              </form>
            </div>
            <div id="login-tab-content">
              <span id="login-tab">Don't have an account? <a>Click to sign Up</a></span>
              <form className="login-form" onSubmit={this.onSignIn}>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  className="input"
                  id="email"
                  placeholder="Email" />
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  className="input"
                  id="password"
                  placeholder="Password" />
                <input
                  type="submit"
                  className="button"
                  value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});
const actions = { userSignUpRequest, userSignInRequest };

export default connect(mapStateToProps, actions)(withRouter(Auth));
