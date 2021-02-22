import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
// import Auth0 from "../../helpers/auth0";
import Firebase from "../../helpers/firebase";
// import FirebaseLogin from "../../components/firebase";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { notification } from '../../components/index';

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {  
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    confirmLoading: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    const { email, password } = this.state;    

    if (!(email && password)) {
      notification('error', 'Please fill in email. and password');
      return;
    }
    this.setState({
      confirmLoading: true
    });
    const self = this;
    let isError = false;
    Firebase.login(Firebase.EMAIL, { email, password })
      .catch(result => {
        const message =
          result && result.message ? result.message : 'Sorry Some error occurs';
        notification('error', message);
        self.setState({
          confirmLoading: false
        });
        isError = true;
      })
      .then(result => {
        if (isError) {
          return;
        }
        if (!result || result.message) {
          const message =
            result && result.message
              ? result.message
              : 'Sorry Some error occurs';
          notification('error', message);
          self.setState({
            confirmLoading: false
          });
        } else {
          self.setState({
            visible: false,
            confirmLoading: false
          });
          localStorage.setItem('user_email', email);

          login();
          clearMenu();    
          self.props.history.push("/dashboard");
        }
      });

    // login();
    // clearMenu();    
    // this.props.history.push("/dashboard");
  };
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                {/* <Input size="large" placeholder="Username" /> */}
                <Input
                ref={email => (this.email = email)}
                size="large"
                placeholder="Email"
                value={this.state.email}
                onChange={event => {
                  this.setState({ email: event.target.value });
                }}
              />
              </div>

              <div className="isoInputWrapper">
                {/* <Input size="large" type="password" placeholder="Password" /> */}
                <Input
                type="password"
                size="large"
                placeholder="Password"
                value={this.state.password}
                onChange={event => {
                  this.setState({ password: event.target.value });
                }}
              />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              {/* <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p> */}

              {/* <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>

                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button>
                )}

                {Firebase.isValid && <FirebaseLogin login={this.handleLogin} />}
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login, clearMenu }
)(SignIn);
